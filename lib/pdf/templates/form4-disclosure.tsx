import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form4Props = {
  address: string;
  agentName: string;
  defectNotes: string;
  sellerSignature?: string;
  currentDate: string;
};

function Form4Disclosure(props: Form4Props) {
  const { address, agentName, defectNotes, sellerSignature, currentDate } =
    props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>הצהרת גילוי נאות</Text>
            <Text style={styles.headerSubtitle}>הצהרת מוכר</Text>
          </View>
          <Text style={styles.headerSubtitle}>תאריך: {currentDate}</Text>
        </View>

        <Text style={styles.title}>הצהרת גילוי נאות (הצהרת מוכר)</Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>פרטי הנכס</Text>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת הנכס:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מתווך מלווה:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{agentName}</Text>
        </View>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>הצהרת המוכר</Text>
        <Text style={styles.body}>
          אני, המוכר, מצהיר/ה בזאת כי למיטב ידיעתי:
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.body}>
          1. אין בנכס פגמים נסתרים שלא ניתן להבחין בהם בבדיקה סבירה, למעט
          המפורט להלן.
        </Text>
        <Text style={styles.body}>
          2. לא ידוע לי על צווי הריסה, צווי מניעה, או כל הליך משפטי התלוי
          ועומד בקשר לנכס.
        </Text>
        <Text style={styles.body}>
          3. לא ידוע לי על חריגות בנייה או שימוש חורג מהיתר הבנייה בנכס.
        </Text>
        <Text style={styles.body}>
          4. לא ידוע לי על שיעבודים, עיקולים, או זכויות צד שלישי הרובצים על
          הנכס, מלבד המפורט בנסח הטאבו.
        </Text>
        <Text style={styles.body}>
          5. כל המערכות בנכס (חשמל, אינסטלציה, גז, מיזוג) תקינות למיטב
          ידיעתי, למעט המפורט להלן.
        </Text>
        <Text style={styles.body}>
          6. לא ידוע לי על בעיות רטיבות, נזילות, או חדירת מים בנכס, למעט
          המפורט להלן.
        </Text>
        <Text style={styles.body}>
          7. לא ידוע לי על תוכניות בנייה סמוכות או שינויי תב״ע העלולים להשפיע
          על ערך הנכס.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>ליקויים ופגמים ידועים</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            minHeight: 80,
            marginBottom: 12,
          }}
        >
          <Text style={styles.body}>
            {defectNotes || "לא ידוע על ליקויים או פגמים."}
          </Text>
        </View>

        <Text style={styles.subtitle}>אישור</Text>
        <Text style={styles.body}>
          אני מאשר/ת כי כל המידע המפורט לעיל הינו נכון ומלא למיטב ידיעתי.
          ידוע לי כי אי גילוי מידע מהותי עלול להוות עילה לביטול העסקה ו/או
          לתביעת פיצויים. הצהרה זו ניתנת לטובת הקונה הפוטנציאלי ולטובת המתווך{" "}
          <Text style={styles.fieldHighlight}>{agentName}</Text>.
        </Text>

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <View>
          <Text style={styles.body}>חתימת המוכר:</Text>
          {sellerSignature ? (
            <Image src={sellerSignature} style={styles.signatureImage} />
          ) : (
            <View style={styles.signatureArea}>
              <Text style={styles.signatureLabel}>חתימה</Text>
            </View>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            הצהרת גילוי נאות | {agentName}
          </Text>
          <Text style={styles.footerText}>הופק בתאריך {currentDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form4Disclosure };
export type { Form4Props };
