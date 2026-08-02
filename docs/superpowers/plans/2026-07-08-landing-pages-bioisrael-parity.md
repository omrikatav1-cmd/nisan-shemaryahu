# Nisan Landing Pages — Bio Israel Parity Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Tasks marked **BLOCKED** cannot start until the listed input arrives — do not fabricate the missing data to unblock them.

**Goal:** Bring `/מנעולן`, `/אינסטלטור`, `/הנדימן` to the same conversion-page maturity as bioisrael.co.il — real trust signals, real photography, no empty sections — without inventing a single fact that isn't true.

**Architecture:** All three pages share one shell (`LightServicePage.tsx`) built from per-service data in `lib/serviceContent.ts` + shared facts in `lib/siteConfig.ts`. Every task below either edits shared data/components (affects all 3 pages at once) or a single profession's config (affects 1 page). No new dependencies — Next.js/Tailwind/Framer Motion/lucide-react already installed.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4 (`@theme` tokens in `app/globals.css`), Framer Motion, lucide-react.

---

## 0. Baseline — what already shipped (2026-07-08 session)

Already live on `claude/elegant-sammet-10972f`, not part of this plan:
- Per-item icons on service cards (`lib/serviceIcons.tsx`)
- Stats band with real numbers only (`components/light/LightStats.tsx`)
- "Why me" benefits grid (`components/light/LightWhyUs.tsx`)
- Problem→solution narrative section (`components/light/LightProblemSolution.tsx`)
- Service-area city grid (`components/light/LightServiceAreas.tsx`)
- Secondary CTA banner (`components/light/LightCTABanner.tsx`)

What's below is everything still needed to close the gap with bioisrael.co.il.

---

## 1. BLOCKING — inputs only Omri/Nisan can supply

Nothing in Section 2–4 that depends on these should be started with placeholder/fake data. List them out, then work the rest of the plan while waiting.

- [ ] **Real work photos.** 6 images needed (hero + secondary "why us" photo × 3 professions). Either: (a) Nisan sends real photos of himself working, or (b) unblock AI generation — the two image tools tried this session both failed: Gemini key invalid (`gemini-image-mcp-server`), Higgsfield workspace out of credits (`generate_image`). Fix either and I generate them free of further input.
- [ ] **Business WhatsApp number.** `lib/siteConfig.ts:8` still points at the personal number with a TODO — brief says a business number is coming. Needed before ad spend starts (so campaign clicks don't land on Nisan's personal WhatsApp).
- [ ] **Google Business Profile** — link + current rating/review count, if one exists. Required before adding any "5.0 · X ביקורות" badge (bioisrael's trust-strip pattern). Without it, that badge stays out — no fabricated rating.
- [ ] **2–3 real customer testimonial quotes**, each with a first name + which service they used (locksmith/plumbing/handyman), sourced from Google reviews or WhatsApp thank-you texts. Without these, no testimonials section ships on any page — that's intentional, not an oversight.
- [ ] **Locksmith police-approval certificate — a scan/photo of the actual document.** `COMPLIANCE.locksmithCertified = true` in `lib/siteConfig.ts:47` confirms it's real, but there's no image of it yet. A photographed certificate is a strong, honest trust element bioisrael uses heavily (their "מילואימניק" certificate photo). Locksmith page only — plumbing certification is explicitly not ready (`plumbingCertified: false`) and must not get this treatment.
- [ ] **Confirm which existing logo file goes where.** `public/brand/` already has `logo-general-v1.png`, `logo-general-v2.png`, `logo-locksmith.png`, `logo-plumbing.png`, `logo-handyman.png` (1024×1024 each) sitting unused — Task 6 below wires them into the navbar/footer, but need a yes/no on general-v1 vs v2 for the shared spots.

---

## 2. Page-wide tasks (apply to all 3 pages via shared components)

### Task 1: Show real business hours instead of nothing

`lib/siteConfig.ts` already defines `HOURS` (regular/sos/sosLate/availability) but no component renders it. Bioisrael doesn't hide this — visitors want to know if calling now gets an SOS rate.

**Files:**
- Create: `components/light/LightHours.tsx`
- Modify: `components/light/LightServicePage.tsx`

- [ ] **Step 1: Build the hours component**

```tsx
// components/light/LightHours.tsx
"use client";

import { Clock } from "lucide-react";
import { HOURS } from "@/lib/siteConfig";

export default function LightHours() {
  return (
    <div className="light-card px-6 py-5 flex items-start gap-3 max-w-md mr-0 ml-auto">
      <Clock size={18} className="text-l-accent mt-0.5 flex-shrink-0" />
      <div className="text-sm text-l-text-2 leading-relaxed">
        <p><span className="font-bold text-l-text">{HOURS.regular}</span> — תעריף רגיל</p>
        <p><span className="font-bold text-l-text">{HOURS.sos}</span></p>
        <p><span className="font-bold text-l-text">{HOURS.sosLate}</span></p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Place it under the hero badges**

In `components/light/LightHero.tsx`, after the closing `</motion.div>` of the badges block (the one mapping `service.heroBadges`), add:

```tsx
        <div className="mt-6 flex justify-end">
          <LightHours />
        </div>
```

Add the import at the top: `import LightHours from "@/components/light/LightHours";`

- [ ] **Step 3: Verify**

Run `npm run dev`, open `/מנעולן`, confirm the hours card renders under the hero CTA buttons with no layout overlap on mobile width (375px).

- [ ] **Step 4: Commit**

```bash
git add components/light/LightHours.tsx components/light/LightHero.tsx
git commit -m "feat: show real business hours on hero"
```

---

### Task 2: Replace the trust-bar marquee with a static confident strip

Current `LightTrustBar.tsx` scrolls trust items in an infinite marquee. Bioisrael's equivalent (`trust-strip`) is static — a row of badges the eye can read instantly. A scrolling ticker reads as filler; a static row reads as confident. Also add the real street address here (`BUSINESS_ADDRESS`) — currently defined in `siteConfig.ts` but never displayed anywhere on these pages.

**Files:**
- Modify: `components/light/LightTrustBar.tsx`

- [ ] **Step 1: Replace the marquee markup with a static wrap**

```tsx
"use client";

import { ShieldCheck, MapPin } from "lucide-react";
import { BUSINESS_ADDRESS } from "@/lib/siteConfig";

export default function LightTrustBar({ items }: { items: string[] }) {
  return (
    <section className="py-6 border-y border-l-border bg-l-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 whitespace-nowrap">
            <ShieldCheck size={15} className="text-l-primary" />
            <span className="text-sm font-semibold text-l-text-2">{item}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <MapPin size={15} className="text-l-accent" />
          <span className="text-sm font-semibold text-l-text-2">{BUSINESS_ADDRESS.street}, {BUSINESS_ADDRESS.city}</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the now-unused marquee CSS**

In `app/globals.css`, remove the `/* ─── Marquee ───... */` block (`@keyframes marquee-rtl`, `.marquee-track`, `.marquee-wrap:hover .marquee-track`) — grep first to confirm nothing else references `.marquee-track`/`.marquee-wrap`:

```bash
grep -rn "marquee" components/ app/
```

If the grep only shows the CSS file itself after Step 1, delete the block.

- [ ] **Step 3: Verify**

`npm run dev`, check all 3 pages — trust items should sit on one static wrapped row, no animation, no marquee gradient masks.

- [ ] **Step 4: Commit**

```bash
git add components/light/LightTrustBar.tsx app/globals.css
git commit -m "refactor: replace scrolling trust marquee with static strip + real address"
```

---

### Task 3: Add anchor-link quick nav to the footer

Bioisrael's footer has a working "quick nav" column (לתמה אנחנו / תהליך העבודה / שאלות נפוצות / צור קשר). Nisan's footer currently only has 3 columns (brand, other services, area) with no in-page navigation. All the anchor targets already exist except one.

**Files:**
- Modify: `components/light/LightWhyUs.tsx` (add section `id`)
- Modify: `components/light/LightFooter.tsx`

- [ ] **Step 1: Give the "why us" section an id to link to**

In `components/light/LightWhyUs.tsx`, change the `<section className="py-20 px-4 sm:px-6">` to `<section id="why-us" className="py-20 px-4 sm:px-6">`.

- [ ] **Step 2: Add the quick-nav column to the footer**

In `components/light/LightFooter.tsx`, change the grid from `grid-cols-1 sm:grid-cols-3` to `grid-cols-1 sm:grid-cols-4` and insert a new column after the brand block:

```tsx
        <div>
          <h4 className="font-bold text-sm mb-4">ניווט מהיר</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#why-us" className="text-l-text-muted hover:text-l-primary text-sm transition-colors">למה ניסן</a></li>
            <li><a href="#services" className="text-l-text-muted hover:text-l-primary text-sm transition-colors">השירותים</a></li>
            <li><a href="#faq" className="text-l-text-muted hover:text-l-primary text-sm transition-colors">שאלות נפוצות</a></li>
            <li><a href="#contact" className="text-l-text-muted hover:text-l-primary text-sm transition-colors">צור קשר</a></li>
          </ul>
        </div>
```

- [ ] **Step 3: Verify**

`npm run dev`, scroll to footer on `/הנדימן`, click each quick-nav link, confirm it scrolls to the right section (smooth-scroll already enabled via `html { scroll-behavior: smooth; }` in `globals.css`).

- [ ] **Step 4: Commit**

```bash
git add components/light/LightWhyUs.tsx components/light/LightFooter.tsx
git commit -m "feat: add quick-nav column to footer"
```

---

### Task 4: Wire the WhatsApp CTA into the problem/solution section

Every other section (hero, navbar, CTA banner) offers both phone + WhatsApp. The problem/solution section only has a phone button — the customer most likely to convert from an emotional "this is stressful" narrative is also the most likely to prefer the lower-friction WhatsApp tap.

**Files:**
- Modify: `components/light/LightProblemSolution.tsx`

- [ ] **Step 1: Add the WhatsApp button next to the phone button**

Add the import: `import { MessageCircle } from "lucide-react";` and `import { getSosWhatsAppUrl } from "@/lib/whatsapp";`. Add a `whatsappLabel: string` prop. Replace the single `<a href={OWNER_PHONE_HREF}>` block with:

```tsx
          <div className="flex gap-3">
            <a
              href={OWNER_PHONE_HREF}
              className="inline-flex items-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-6 py-3.5 rounded-xl transition-colors shadow-[0_8px_24px_rgba(20,57,94,0.25)]"
            >
              <Phone size={16} />
              <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
            </a>
            <a
              href={getSosWhatsAppUrl(whatsappLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-l-accent hover:bg-l-accent-dim text-white font-black px-6 py-3.5 rounded-xl transition-colors shadow-[0_8px_24px_rgba(201,122,43,0.3)]"
            >
              <MessageCircle size={16} />
              וואטסאפ
            </a>
          </div>
```

- [ ] **Step 2: Pass the new prop from the page shell**

In `components/light/LightServicePage.tsx`, change:
```tsx
<LightProblemSolution problem={service.problem} icon={service.services[0].icon} />
```
to:
```tsx
<LightProblemSolution problem={service.problem} icon={service.services[0].icon} whatsappLabel={service.whatsappIssueLabel} />
```

- [ ] **Step 3: Verify**

`npm run dev`, check the problem/solution section on all 3 pages shows both buttons, WhatsApp opens `wa.me` with the right prefilled issue label per profession.

- [ ] **Step 4: Commit**

```bash
git add components/light/LightProblemSolution.tsx components/light/LightServicePage.tsx
git commit -m "feat: add WhatsApp CTA to problem/solution section"
```

---

### Task 5: Replace the problem/solution gradient icon panel with real photos (BLOCKED)

**Blocked on:** Section 1, "Real work photos" — specifically the "why us"/secondary photo per profession.

**Files:**
- Modify: `components/light/LightProblemSolution.tsx`
- Add: `public/images/locksmith-work.jpg`, `public/images/plumbing-work.jpg`, `public/images/handyman-work.jpg`

- [ ] **Step 1: Once the photo lands in `public/images/<profession>-work.jpg`, add a `photo: string` field to `ProblemSolution` type in `lib/serviceContent.ts`** and set it per service (e.g. `photo: "/images/locksmith-work.jpg"`).

- [ ] **Step 2: Replace the gradient-icon panel in `LightProblemSolution.tsx`** with:

```tsx
import Image from "next/image";
// ...
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 20px 50px rgba(20,57,94,0.28)" }}
        >
          <Image src={problem.photo} alt="" fill className="object-cover" />
        </motion.div>
```

- [ ] **Step 3: Verify** image loads at correct aspect ratio on mobile + desktop, no layout shift (Next `Image` with `fill` requires the parent to have `position: relative` and a set aspect ratio — already true via `aspect-[4/3]`).

- [ ] **Step 4: Commit**

```bash
git add lib/serviceContent.ts components/light/LightProblemSolution.tsx public/images
git commit -m "feat: replace problem/solution icon panel with real work photo"
```

---

### Task 6: Wire the existing unused logo files into navbar + footer

The per-service logos already exist in `public/brand/` (1024×1024 PNGs) from a prior session but nothing on these pages references them — navbar/footer are text-only. This needs zero new input beyond Section 1's "which general logo" confirmation.

**Files:**
- Modify: `lib/serviceContent.ts` (add `logo: string` field)
- Modify: `components/light/LightNavbar.tsx`
- Modify: `components/light/LightFooter.tsx`

- [ ] **Step 1: Add a logo path per service in `ServiceConfig`**

Add `logo: string;` to the type, then per service:
```ts
// locksmith
logo: "/brand/logo-locksmith.png",
// plumbing
logo: "/brand/logo-plumbing.png",
// handyman
logo: "/brand/logo-handyman.png",
```

- [ ] **Step 2: Render it in the navbar**

In `LightNavbar.tsx`, accept a `logo: string` prop, import `Image` from `next/image`, and replace the text-only brand block:

```tsx
        <Link href="/" className="flex items-center gap-2" aria-label={`${BRAND_NAME} — ראשי`}>
          <Image src={logo} alt="" width={36} height={36} className="rounded-lg" />
          <span className="flex flex-col leading-tight">
            <span className="font-black text-l-text text-lg" style={{ fontFamily: "var(--font-heading)" }}>{BRAND_NAME}</span>
            <span className="text-[10px] text-l-text-muted tracking-[0.15em] font-medium">אור יהודה והסביבה</span>
          </span>
        </Link>
```

- [ ] **Step 3: Pass `logo={service.logo}` from `LightServicePage.tsx`** to both `LightNavbar` and `LightFooter` (footer: same treatment next to the `{BRAND_NAME}` heading, 32×32).

- [ ] **Step 4: Verify** each of the 3 pages shows its own profession logo in the header, no layout shift, alt text empty (decorative, brand name is already text alongside it).

- [ ] **Step 5: Commit**

```bash
git add lib/serviceContent.ts components/light/LightNavbar.tsx components/light/LightFooter.tsx components/light/LightServicePage.tsx
git commit -m "feat: wire existing per-service logos into navbar and footer"
```

---

## 3. Per-profession tasks

### Task 7: Locksmith — certificate trust section (BLOCKED)

**Blocked on:** Section 1, "Locksmith police-approval certificate" scan.

**Files:**
- Create: `components/light/LightCertificate.tsx`
- Modify: `app/locksmith/page.tsx` only (not the other two — this is locksmith-specific, do not add a `certificateImage` field to the shared `ServiceConfig` type; pass it as a direct prop from the page file so plumbing/handyman can never accidentally render it before they're certified)

- [ ] **Step 1: Once the scan lands in `public/certificates/locksmith-police-approval.jpg`, build the section**

```tsx
// components/light/LightCertificate.tsx
"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function LightCertificate() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-3xl mx-auto light-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-40 h-52 flex-shrink-0 rounded-lg overflow-hidden border border-l-border">
          <Image src="/certificates/locksmith-police-approval.jpg" alt="אישור משטרה למנעולנות" fill className="object-cover" />
        </div>
        <div className="text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 text-l-primary font-bold text-xs uppercase tracking-wide mb-2">
            <ShieldCheck size={14} />
            מאומת רשמית
          </div>
          <h3 className="font-black text-xl mb-2">אישור משטרה בתוקף</h3>
          <p className="text-l-text-2 text-sm leading-relaxed">
            עבודות פריצה ונעילה דורשות אישור משטרה אישי — ניסן מחזיק באישור בתוקף, כנדרש בחוק.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render it only on the locksmith page**, between the "why us" and "problem/solution" sections. Since `LightServicePage.tsx` is shared, add an optional children slot rather than a per-service boolean flag:

In `LightServicePage.tsx`, add `children?: React.ReactNode` to the props and render `{children}` right after `<LightWhyUs items={service.whyUs} />`. Then in `app/locksmith/page.tsx`:

```tsx
import LightCertificate from "@/components/light/LightCertificate";
// ...
export default function Page() {
  return (
    <LightServicePage service={service}>
      <LightCertificate />
    </LightServicePage>
  );
}
```

`app/plumbing/page.tsx` and `app/handyman/page.tsx` stay untouched — no `children` passed, nothing renders.

- [ ] **Step 3: Verify** the certificate section appears only on `/מנעולן`, not on `/אינסטלטור` or `/הנדימן`.

- [ ] **Step 4: Commit**

```bash
git add components/light/LightCertificate.tsx components/light/LightServicePage.tsx app/locksmith/page.tsx public/certificates
git commit -m "feat: add locksmith police-approval certificate section"
```

---

### Task 8: Testimonials section — all 3 pages (BLOCKED)

**Blocked on:** Section 1, "2-3 real customer testimonial quotes" (and ideally the Google Business Profile link).

**Files:**
- Modify: `lib/serviceContent.ts` (add `testimonials: Testimonial[]` field, empty until real data arrives)
- Create: `components/light/LightTestimonials.tsx`
- Modify: `components/light/LightServicePage.tsx`

- [ ] **Step 1: Add the type once quotes exist**

```ts
export type Testimonial = {
  quote: string;
  name: string;
  serviceUsed: string; // e.g. "פריצת דלת", must match something the customer actually used
};
```
Add `testimonials: Testimonial[];` to `ServiceConfig`, filled with the real quotes provided — do not backfill with placeholder names/quotes.

- [ ] **Step 2: Build the section**

```tsx
// components/light/LightTestimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/serviceContent";

export default function LightTestimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-right mb-10 max-w-xl mr-0 ml-auto">
          <p className="text-l-accent text-xs font-black tracking-[0.2em] uppercase mb-2">לקוחות מספרים</p>
          <h2 className="text-3xl sm:text-4xl font-black">מה אומרים עליי</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="light-card p-6"
            >
              <Quote size={20} className="text-l-accent mb-3" />
              <p className="text-l-text-2 text-sm leading-relaxed mb-4">&quot;{t.quote}&quot;</p>
              <p className="font-bold text-sm">{t.name}</p>
              <p className="text-l-text-muted text-xs">{t.serviceUsed}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Note the `if (items.length === 0) return null;` guard — this means the section can be wired in immediately without waiting, and it will simply stay invisible until real quotes are added to `serviceContent.ts`. Safe to do Step 3 today.

- [ ] **Step 3: Wire it into the page shell now** (safe — guarded by the empty check above)

In `LightServicePage.tsx`, import `LightTestimonials` and render `<LightTestimonials items={service.testimonials} />` right after `<LightServiceAreas />`. Add `testimonials: []` to all three services in `serviceContent.ts` for now.

- [ ] **Step 4: Verify** nothing renders on any page today (empty array), then once real quotes are added to one service's `testimonials` array, only that page shows the section.

- [ ] **Step 5: Commit**

```bash
git add lib/serviceContent.ts components/light/LightTestimonials.tsx components/light/LightServicePage.tsx
git commit -m "feat: add testimonials section (empty until real quotes are provided)"
```

---

## 4. Suggested order

1. Task 1, 2, 3, 4, 6 — no blockers, pure improvement, do these first (all touch shared components, benefit all 3 pages immediately).
2. Task 8 — wire the guarded empty section now too (it's a no-op until data arrives, so there's no reason to wait).
3. Hand Section 1's checklist to Omri/Nisan; work stops there for Tasks 5 and 7 until photos + certificate scan arrive.
4. Task 5, then Task 7 once the blocking assets land.

---

## Self-review

- **Spec coverage:** every "remove/improve/add" surfaced in the bioisrael comparison is covered — marquee→static (Task 2), hours (Task 1), address (Task 2), footer nav (Task 3), dual CTA (Task 4), real photos (Task 5), logos (Task 6), certificate (Task 7), testimonials (Task 8). Nothing from the comparison was left out.
- **No fabrication:** every blocked task stays blocked in the plan text itself — no task tells the engineer to invent a stat, quote, or certificate.
- **Type consistency:** `ServiceConfig` gains `logo`, `testimonials` (Task 6, 8); `ProblemSolution` gains `photo` (Task 5) — no field is referenced before its task defines it.
