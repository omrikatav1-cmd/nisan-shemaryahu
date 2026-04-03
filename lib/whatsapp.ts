const OWNER_PHONE = "972509911241"; // 050-9911241 in international format

export function formatLeadMessage(name: string, issue: string): string {
  return `היי ניסן, ליד חדש מהאתר: ${name} - ${issue}`;
}

export function getWhatsAppUrl(name: string, issue: string): string {
  const message = encodeURIComponent(formatLeadMessage(name, issue));
  return `https://wa.me/${OWNER_PHONE}?text=${message}`;
}

export function getSosWhatsAppUrl(): string {
  const message = encodeURIComponent("חירום! צריך עזרה דחופה מניסן שמריהו.");
  return `https://wa.me/${OWNER_PHONE}?text=${message}`;
}
