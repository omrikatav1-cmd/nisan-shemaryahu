// Google Tag Manager — single container drives GA4 + Google Ads conversions.
// Everything (GA4 config, Ads conversion tags, tel:/wa.me click triggers) is
// configured inside the GTM web UI, NOT in code — so אדיר can add/change tags
// without a redeploy. The ONLY thing code does is: (1) load the container,
// (2) push the lead-form submit (an async fetch GTM can't see on its own).
//
// ponytail: GTM click triggers capture every tel:/wa.me anchor conversion with
// zero React instrumentation — upgrade to explicit dataLayer pushes per CTA only
// if a click trigger ever proves flaky. See docs/campaign-launch-guide.html.

// Empty until אדיר creates the container and sets NEXT_PUBLIC_GTM_ID on Vercel.
// Read at build time (NEXT_PUBLIC_*), so changing it needs a fresh deploy.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Fires the lead-form conversion into GTM's dataLayer, tagged with which of the
 * 3 parallel campaigns produced it, so each Google Ads conversion action can be
 * attributed to the right funnel/page. No-op if GTM isn't loaded.
 */
export function pushLeadEvent(service: string, sourcePage: string): void {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({
    event: "lead_form_submit",
    lead_service: service,
    source_page: sourcePage,
  });
}
