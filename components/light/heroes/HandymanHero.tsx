"use client";

import type { ServiceConfig } from "@/lib/serviceContent";
import { buildServiceStats } from "@/lib/serviceContent";
import { SERVICE_PHOTO } from "@/lib/theme";
import { HeroShell, HeroBadge, HeroHeadline, HeroSub, HeroCTAButtons, HeroBadgePills, HeroStatsRow } from "@/components/light/heroes/heroShared";

// Handyman hero — full-bleed navy/warm-amber background, craft/warmth feel.
export default function HandymanHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `רשימת תיקונים ב${cityName}?` : service.heroHeadline;

  return (
    <HeroShell
      image={SERVICE_PHOTO.handyman}
      gradient="linear-gradient(135deg, rgba(20,57,94,0.85) 0%, rgba(12,39,64,0.9) 55%, rgba(5,18,31,0.93) 100%)"
      glow="radial-gradient(circle at 78% 20%, rgba(201,122,43,0.35), transparent 60%)"
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
