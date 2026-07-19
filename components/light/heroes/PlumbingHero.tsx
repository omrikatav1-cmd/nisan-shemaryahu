"use client";

import type { ServiceConfig } from "@/lib/serviceContent";
import { buildServiceStats } from "@/lib/serviceContent";
import { HeroShell, HeroBadge, HeroHeadline, HeroSub, HeroCTAButtons, HeroBadgePills, HeroStatsRow } from "@/components/light/heroes/heroShared";

// Plumbing hero — full-bleed deep-teal/aqua background, price-anchor badges.
export default function PlumbingHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `נזילה או סתימה ב${cityName}?` : service.heroHeadline;

  return (
    <HeroShell
      gradient="linear-gradient(135deg, var(--color-l-primary) 0%, var(--color-l-primary-dim) 55%, #06232C 100%)"
      glow="radial-gradient(circle at 78% 22%, rgba(21,150,176,0.45), transparent 60%)"
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
