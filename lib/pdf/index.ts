export { Form1SalePurchase } from "./templates/form1-sale-purchase";
export type { Form1Props } from "./templates/form1-sale-purchase";

export { Form2Exclusivity } from "./templates/form2-exclusivity";
export type { Form2Props } from "./templates/form2-exclusivity";

export { Form3Rental } from "./templates/form3-rental";
export type { Form3Props } from "./templates/form3-rental";

export { Form4Disclosure } from "./templates/form4-disclosure";
export type { Form4Props } from "./templates/form4-disclosure";

export { Form5CoBroke } from "./templates/form5-co-broke";
export type { Form5Props } from "./templates/form5-co-broke";

export { Form6Marketing, MARKETING_ACTIONS } from "./templates/form6-marketing";
export type { Form6Props } from "./templates/form6-marketing";

export { HEBREW_FONT_FAMILY } from "./fonts";
export { styles } from "./styles";

function generatePdfFilename(clientName: string, formType: string): string {
  const sanitized = clientName.replace(/\s+/g, "_");
  const date = new Date().toISOString().split("T")[0];
  return `${sanitized}_${formType}_${date}.pdf`;
}

export { generatePdfFilename };
