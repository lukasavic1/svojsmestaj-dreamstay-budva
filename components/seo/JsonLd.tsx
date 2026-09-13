import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { gallery } from "@/data/media";
import { faqs } from "@/data/faq";

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function JsonLd() {
  const images = gallery.map((photo) => absoluteUrl(photo.src));
  const sameAs = [site.social.instagram].filter(Boolean);

  const vacationRental = {
    "@type": "VacationRental",
    "@id": `${siteConfig.url}/#lodging`,
    additionalType: "Apartment",
    identifier: "dream-stay-budva",
    name: site.legalName,
    description: site.seo.description,
    url: siteConfig.url,
    ...(site.contact.phoneDisplay ? { telephone: site.contact.phoneDisplay } : {}),
    image: images,
    latitude: site.location.lat.toFixed(6),
    longitude: Number(site.location.lng).toFixed(6),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.locality,
      addressRegion: site.location.city,
      postalCode: site.location.postalCode,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    checkinTime: "15:00:00+02:00",
    checkoutTime: "10:00:00+02:00",
    knowsLanguage: ["sr-Latn"],
    ...(sameAs.length ? { sameAs } : {}),
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      numberOfBedrooms: site.bedrooms,
      numberOfRooms: 3,
      numberOfBathroomsTotal: site.bathrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        value: site.capacity,
      },
      bed: [{ "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Double" }],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "ac", value: true },
        { "@type": "LocationFeatureSpecification", name: "balcony", value: true },
        { "@type": "LocationFeatureSpecification", name: "beachAccess", value: true },
        { "@type": "LocationFeatureSpecification", name: "kitchen", value: true },
        { "@type": "LocationFeatureSpecification", name: "ovenStove", value: true },
        { "@type": "LocationFeatureSpecification", name: "tv", value: true },
        { "@type": "LocationFeatureSpecification", name: "washerDryer", value: true },
        { "@type": "LocationFeatureSpecification", name: "wifi", value: true },
        { "@type": "LocationFeatureSpecification", name: "elevator", value: true },
        { "@type": "LocationFeatureSpecification", name: "petsAllowed", value: true },
        { "@type": "LocationFeatureSpecification", name: "parkingType", value: "Free" },
        { "@type": "LocationFeatureSpecification", name: "internetType", value: "Free" },
        { "@type": "LocationFeatureSpecification", name: "smokingAllowed", value: false },
      ],
    },
  };

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/favicon.svg"),
    ...(site.contact.phoneDisplay ? { telephone: site.contact.phoneDisplay } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.locality,
      addressRegion: site.location.city,
      postalCode: site.location.postalCode,
      addressCountry: site.location.countryCode,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: site.legalName,
    url: siteConfig.url,
    inLanguage: "sr-Latn",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, website, vacationRental, faqPage],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
