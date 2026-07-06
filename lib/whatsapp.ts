import { OWNER_PHONE_INTL } from "@/lib/siteConfig";

export function formatLeadMessage(name: string, issue: string, service?: string): string {
  const serviceTag = service ? ` [${service}]` : "";
  return `היי ניסן, ליד חדש מהאתר${serviceTag}: ${name} - ${issue}`;
}

export function getWhatsAppUrl(name: string, issue: string, service?: string): string {
  const message = encodeURIComponent(formatLeadMessage(name, issue, service));
  return `https://wa.me/${OWNER_PHONE_INTL}?text=${message}`;
}

export function getSosWhatsAppUrl(service?: string): string {
  const suffix = service ? ` (${service})` : "";
  const message = encodeURIComponent(`חירום! צריך עזרה דחופה מניסן שמריהו${suffix}.`);
  return `https://wa.me/${OWNER_PHONE_INTL}?text=${message}`;
}
