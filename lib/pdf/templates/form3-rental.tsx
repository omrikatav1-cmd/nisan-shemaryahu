import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form3Props = {
  agentName: string;
  licenseNumber: string;
  clientName: string;
  clientID: string;
  propertyAddress: string;
  monthlyRent: string;
  fixedSum?: string;
  signatureImage?: string;
  timestamp: string;
};

function Form3Rental(props: Form3Props) {
  const {
    agentName,
    licenseNumber,
    clientName,
    clientID,
    propertyAddress,
    monthlyRent,
    fixedSum,
    signatureImage,
    timestamp,
  } = props;

  const commissionText = fixedSum
    ? `סכום קבוע של ${fixedSum} ש״ח בתוספת מע״מ`
    : `דמי שכירות של חודש אחד (${monthlyRent} ש״ח) בתוספת מע״מ`;

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
          <Text style={styles.headerSubtitle}>תאריך: {timestamp}</Text>
        </View>

        <Text style={styles.title}>הזמנת שירותי תיווך — השכרה</Text>

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

        <Text style={styles.subtitle}>פרטי הלקוח</Text>
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

        <Text style={styles.subtitle}>פרטי הנכס</Text>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת הנכס:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {propertyAddress}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>דמי שכירות:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {monthlyRent} ש״ח לחודש
          </Text>
        </View>

        <Text style={styles.subtitle}>דמי תיווך</Text>
        <Text style={styles.body}>
          הלקוח מתחייב לשלם למתווך דמי תיווך בסך{" "}
          <Text style={styles.fieldHighlight}>{commissionText}</Text>. דמי
          התיווך ישולמו עם חתימת חוזה שכירות מחייב.
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
          בעסקת השכירות, בהתאם לסעיף 14 לחוק המתווכים.
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
            {agentName} | רישיון תיווך מס׳ {licenseNumber}
          </Text>
          <Text style={styles.footerText}>הופק בתאריך {timestamp}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form3Rental };
export type { Form3Props };
