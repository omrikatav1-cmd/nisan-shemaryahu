import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form1Props = {
  agentName: string;
  licenseNumber: string;
  agentPhone: string;
  clientName: string;
  clientID: string;
  clientAddress: string;
  propertyAddress: string;
  transactionType: "מכירה" | "קנייה";
  price: string;
  commission: number;
  commissionWords: string;
  signatureImage?: string;
  currentDate: string;
};

function Form1SalePurchase(props: Form1Props) {
  const {
    agentName,
    licenseNumber,
    agentPhone,
    clientName,
    clientID,
    clientAddress,
    propertyAddress,
    transactionType,
    price,
    commission,
    commissionWords,
    signatureImage,
    currentDate,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{agentName}</Text>
            <Text style={styles.headerSubtitle}>
              מתווך מורשה מס׳ {licenseNumber}
            </Text>
          </View>
          <Text style={styles.headerSubtitle}>תאריך: {currentDate}</Text>
        </View>

        <Text style={styles.title}>
          הזמנת שירותי תיווך במקרקעין ({transactionType})
        </Text>

        <Text style={styles.body}>
          בהתאם לחוק המתווכים במקרקעין, התשנ״ו-1996 ותקנותיו
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>פרטי המתווך</Text>
        <View style={styles.row}>
          <Text style={styles.label}>שם המתווך:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{agentName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מספר רישיון:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {licenseNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>טלפון:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{agentPhone}</Text>
        </View>

        <Text style={styles.subtitle}>פרטי הלקוח (המזמין)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>שם מלא:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {clientName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ת.ז.:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{clientID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {clientAddress}
          </Text>
        </View>

        <Text style={styles.subtitle}>תיאור הנכס</Text>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת הנכס:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {propertyAddress}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>סוג עסקה:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {transactionType}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מחיר מבוקש:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {price} ש״ח
          </Text>
        </View>

        <Text style={styles.subtitle}>דמי תיווך</Text>
        <Text style={styles.body}>
          הלקוח מתחייב לשלם למתווך דמי תיווך בשיעור של{" "}
          <Text style={styles.fieldHighlight}>{commission}%</Text> (
          <Text style={styles.fieldHighlight}>{commissionWords}</Text>) ממחיר
          העסקה בפועל, בתוספת מע״מ כדין. דמי התיווך ישולמו עם חתימת חוזה
          מחייב בין הצדדים לעסקה.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>הצהרות והתחייבויות</Text>
        <Text style={styles.body}>
          1. הלקוח מאשר כי קרא את תוכן הזמנה זו, הבין את תוכנה ומשמעותה
          המשפטית וחותם עליה מרצונו החופשי.
        </Text>
        <Text style={styles.body}>
          2. הלקוח מצהיר כי הובהר לו שהמתווך עשוי לפעול גם עבור הצד השני
          לעסקה, בכפוף לחובת הגילוי על פי חוק.
        </Text>
        <Text style={styles.body}>
          3. המתווך מתחייב לפעול במקצועיות, בנאמנות ובהגינות, ולמסור ללקוח כל
          מידע מהותי הנוגע לנכס ולעסקה.
        </Text>
        <Text style={styles.body}>
          4. דמי התיווך ישולמו רק אם המתווך היה הגורם היעיל שהביא להתקשרות
          בעסקה, בהתאם לסעיף 14 לחוק המתווכים.
        </Text>
        <Text style={styles.body}>
          5. הסכם זה כפוף לחוק המתווכים במקרקעין, התשנ״ו-1996 ולתקנות שהותקנו
          מכוחו.
        </Text>

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.body}>חתימת הלקוח:</Text>
            {signatureImage ? (
              <Image src={signatureImage} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
            <Text style={styles.small}>{clientName}</Text>
          </View>
          <View>
            <Text style={styles.body}>חתימת המתווך:</Text>
            <View style={styles.signatureArea}>
              <Text style={styles.signatureLabel}>חתימה</Text>
            </View>
            <Text style={styles.small}>{agentName}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {agentName} | רישיון תיווך מס׳ {licenseNumber} | {agentPhone}
          </Text>
          <Text style={styles.footerText}>הופק בתאריך {currentDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form1SalePurchase };
export type { Form1Props };
