"use client";

import type { ServiceConfig } from "@/lib/serviceContent";
import { buildServiceStats } from "@/lib/serviceContent";
import { HeroShell, HeroBadge, HeroHeadline, HeroSub, HeroCTAButtons, HeroBadgePills, HeroStatsRow } from "@/components/light/heroes/heroShared";

// Handyman hero — full-bleed navy/warm-amber background, craft/warmth feel.
export default function HandymanHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `רשימת תיקונים ב${cityName}?` : service.heroHeadline;

  return (
    <HeroShell
      gradient="linear-gradient(135deg, var(--color-l-primary) 0%, var(--color-l-primary-dim) 55%, #05121F 100%)"
      glow="radial-gradient(circle at 78% 20%, rgba(201,122,43,0.4), transparent 60%)"
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
