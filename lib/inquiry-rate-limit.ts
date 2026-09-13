import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { HostInquiry } from "@/lib/inquiry-email";

const SITE = "dreamstay";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function isRedisConfigured() {
  return Boolean(env("UPSTASH_REDIS_REST_URL") && env("UPSTASH_REDIS_REST_TOKEN"));
}

function redis() {
  return Redis.fromEnv();
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "") || "unknown";
}

export async function enforceInquiryRateLimit(
  request: Request,
  inquiry: HostInquiry,
): Promise<{ ok: true } | { ok: false; error: "rate_limited" }> {
  if (!isRedisConfigured()) return { ok: true };

  try {
    const client = redis();
    const ipLimit = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(3, "15 m"),
      prefix: `inquiry:${SITE}:ip`,
    });
    const phoneLimit = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(1, "1 h"),
      prefix: `inquiry:${SITE}:phone`,
    });

    const ip = await ipLimit.limit(clientIp(request));
    if (!ip.success) return { ok: false, error: "rate_limited" };

    const phone = await phoneLimit.limit(phoneDigits(inquiry.phone));
    if (!phone.success) return { ok: false, error: "rate_limited" };

    return { ok: true };
  } catch (error) {
    console.error("[inquiry] redis", error instanceof Error ? error.message : error);
    return { ok: true };
  }
}

export async function shouldSendWhatsApp(inquiry: HostInquiry) {
  if (!isRedisConfigured()) return true;

  try {
    const client = redis();
    const dedupKey = `inquiry:${SITE}:dedup:${phoneDigits(inquiry.phone)}:${inquiry.checkIn}:${inquiry.checkOut}`;
    const already = await client.get(dedupKey);
    if (already) return false;

    const daily = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(20, "1 d"),
      prefix: `wa:${SITE}:daily`,
    });
    const result = await daily.limit("all");
    return result.success;
  } catch (error) {
    console.error("[inquiry] redis wa", error instanceof Error ? error.message : error);
    return true;
  }
}

export async function markWhatsAppSent(inquiry: HostInquiry) {
  if (!isRedisConfigured()) return;

  try {
    const dedupKey = `inquiry:${SITE}:dedup:${phoneDigits(inquiry.phone)}:${inquiry.checkIn}:${inquiry.checkOut}`;
    await redis().set(dedupKey, "1", { ex: 60 * 60 * 24 });
  } catch (error) {
    console.error("[inquiry] redis dedup", error instanceof Error ? error.message : error);
  }
}
