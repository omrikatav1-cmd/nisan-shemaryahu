// Shared client/server validation so acceptance criteria can never diverge —
// mobile only (05x), matches how leads are actually contacted (call/WhatsApp).
export const ISRAELI_PHONE_REGEX = /^(05[0-9]\d{7}|(\+972)5[0-9]\d{7})$/;

export function isValidIsraeliPhone(phone: string): boolean {
  const normalized = phone.replace(/[-\s]/g, "");
  return ISRAELI_PHONE_REGEX.test(normalized);
}
