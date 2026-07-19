"use client";

import type { ServiceConfig } from "@/lib/serviceContent";
import { buildServiceStats } from "@/lib/serviceContent";
import { SERVICE_PHOTO } from "@/lib/theme";
import { HeroShell, HeroBadge, HeroHeadline, HeroSub, HeroCTAButtons, HeroBadgePills, HeroStatsRow } from "@/components/light/heroes/heroShared";

// Plumbing hero — full-bleed deep-teal/aqua background, price-anchor badges.
export default function PlumbingHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `נזילה או סתימה ב${cityName}?` : service.heroHeadline;

  return (
    <HeroShell
      image={SERVICE_PHOTO.plumbing}
      gradient="linear-gradient(135deg, rgba(14,76,107,0.85) 0%, rgba(10,54,80,0.9) 55%, rgba(6,35,44,0.93) 100%)"
      glow="radial-gradient(circle at 78% 22%, rgba(21,150,176,0.4), transparent 60%)"
    >
      <HeroBadge>{service.heroEyebrow}</HeroBadge>
      <HeroHeadline headline={headline} accent={service.heroHeadlineAccent} />
      <HeroSub>{service.heroSub}</HeroSub>
      <HeroCTAButtons service={service} phoneDominant />
      <HeroBadgePills badges={service.heroBadges} />
      <HeroStatsRow stats={buildServiceStats(service)} />
    </HeroShell>
  );
}
