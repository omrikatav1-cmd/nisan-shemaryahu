import type { CSSProperties } from "react";
import type { ServiceKey } from "@/lib/serviceContent";

// Per-service visual identity. Applied as inline CSS custom properties on each
// funnel's root wrapper — this overrides the --color-l-* tokens for that whole
// subtree, so every `text-l-primary` / `bg-l-accent` utility recolors itself.
// Result: three funnels that look genuinely different, not one recolored template.
//
// - locksmith: steel + alarm red — emergency/security feel
// - plumbing:  deep teal + aqua   — water/reliability feel
// - handyman:  navy + warm amber  — craft/warmth feel
export const SERVICE_THEME: Record<ServiceKey, CSSProperties> = {
  locksmith: {
    ["--color-l-primary" as string]: "#1F2D3D",
    ["--color-l-primary-dim" as string]: "#111A24",
    ["--color-l-accent" as string]: "#C0392B",
    ["--color-l-accent-dim" as string]: "#992B20",
  },
  plumbing: {
    ["--color-l-primary" as string]: "#0E4C6B",
    ["--color-l-primary-dim" as string]: "#0A3650",
    ["--color-l-accent" as string]: "#1596B0",
    ["--color-l-accent-dim" as string]: "#0F7186",
  },
  handyman: {
    ["--color-l-primary" as string]: "#14395E",
    ["--color-l-primary-dim" as string]: "#0C2740",
    ["--color-l-accent" as string]: "#C97A2B",
    ["--color-l-accent-dim" as string]: "#A35F1C",
  },
};

// Per-service logo mark (icon matches the trade — key+shield, pipe-wrench+droplet,
// hammer+toolbox). Used only within that service's own funnel — the shared
// WhatsApp/phone still uses the service-neutral general logo, not these.
export const SERVICE_LOGO: Record<ServiceKey, string> = {
  locksmith: "/brand/logo-locksmith.png",
  plumbing: "/brand/logo-plumbing.png",
  handyman: "/brand/logo-handyman.png",
};

// Real, licensed (Pexels — free for commercial use) photos per trade. Used
// as the hero background and reused in the Problem/Solution panel — stand-in
// until Nisan's own photoshoot with ללב מדיה.
export const SERVICE_PHOTO: Record<ServiceKey, string> = {
  locksmith: "/images/hero-locksmith.jpg",
  plumbing: "/images/hero-plumbing.jpg",
  handyman: "/images/hero-handyman.jpg",
};
