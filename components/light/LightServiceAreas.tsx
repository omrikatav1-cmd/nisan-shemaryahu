"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { BASE_CITY } from "@/lib/siteConfig";
import type { ServiceConfig } from "@/lib/serviceContent";
import { CITIES, cityUrl } from "@/lib/cities";
import LightSectionHeader from "@/components/light/LightSectionHeader";

// Links to this service's own city pages only (sealed funnel + internal SEO).
export default function LightServiceAreas({ service, currentCitySlug }: { service: ServiceConfig; currentCitySlug?: string }) {
  const cities = CITIES.filter((c) => c.slug !== currentCitySlug);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-right">
        <LightSectionHeader
          eyebrow="אזור שירות"
          title={`${service.navLabel} בכל האזור`}
          sub={<>מבוסס ב{BASE_CITY}, ומגיע לכל היישובים הסמוכים ברדיוס של כ-15 ק&quot;מ. בחרו את היישוב שלכם:</>}
        />

        <div className="flex flex-wrap justify-end gap-3">
          {cities.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}>
              <Link href={cityUrl(service.slug, c)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border bg-l-surface text-l-text-2 border-l-border hover:border-l-primary hover:text-l-primary transition-colors">
                <MapPin size={13} className="text-l-accent" />
                {service.navLabel} {c.prefixed}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
