"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { ContactFaqSection } from "@/components/sections/ContactFaqSection";
import { FirstGuestsSection } from "@/components/sections/FirstGuestsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { MomentsSection } from "@/components/sections/MomentsSection";
import { SpacesSection } from "@/components/sections/SpacesSection";
import { SiteChrome } from "@/components/SiteChrome";

export function PropertySite() {
  return (
    <SiteChrome>
      <main>
        <HeroSection />
        <SpacesSection />
        <AboutSection />
        <MomentsSection />
        <GallerySection />
        <AmenitiesSection />
        <LocationSection />
        <FirstGuestsSection />
        <InquirySection />
        <ContactFaqSection />
      </main>
    </SiteChrome>
  );
}
