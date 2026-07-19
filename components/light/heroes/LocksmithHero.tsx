"use client";

import type { ServiceConfig } from "@/lib/serviceContent";
import { buildServiceStats } from "@/lib/serviceContent";
import { SERVICE_PHOTO } from "@/lib/theme";
import { HeroShell, HeroBadge, HeroHeadline, HeroSub, HeroCTAButtons, HeroBadgePills, HeroStatsRow } from "@/components/light/heroes/heroShared";

// Locksmith hero — EMERGENCY framing. Full-bleed steel+alarm-red background,
// live "available now" pulse on the badge.
export default function LocksmithHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `ננעלת בחוץ ב${cityName}?` : service.heroHeadline;

  return (
    <HeroShell
      image={SERVICE_PHOTO.locksmith}
      gradient="linear-gradient(135deg, rgba(31,45,61,0.88) 0%, rgba(17,26,36,0.92) 55%, rgba(10,20,32,0.95) 100%)"
      glow="radial-gradient(circle at 78% 18%, rgba(192,57,43,0.35), transparent 60%)"
    >
      <HeroBadge pulse>{service.heroEyebrow}</HeroBadge>
      <HeroHeadline headline={headline} accent={service.heroHeadlineAccent} />
      <HeroSub>{service.heroSub}</HeroSub>
      <HeroCTAButtons service={service} phoneDominant />
      <HeroBadgePills badges={service.heroBadges} />
      <HeroStatsRow stats={buildServiceStats(service)} />
    </HeroShell>
  );
}
