import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form2Props = {
  agentName: string;
  orderDate: string;
  propertyAddress: string;
  startDate: string;
  endDate: string;
  agentSignature?: string;
  clientSignature?: string;
};

function Form2Exclusivity(props: Form2Props) {
  const {
    agentName,
    orderDate,
    propertyAddress,
    startDate,
    endDate,
    agentSignature,
    clientSignature,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{agentName}</Text>
            <Text style={styles.headerSubtitle}>מתווך מורשה</Text>
          </View>
          <Text style={styles.headerSubtitle}>תאריך: {orderDate}</Text>
        </View>

        <Text style={styles.title}>הסכם בלעדיות לשירותי תיווך</Text>

        <Text style={styles.body}>
          בהתאם לתקנות המתווכים במקרקעין (פעולות שיווק), התשנ״ז-1997
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>פרטי הנכס</Text>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת הנכס:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {propertyAddress}
          </Text>
        </View>

        <Text style={styles.subtitle}>תקופת הבלעדיות</Text>
        <View style={styles.row}>
          <Text style={styles.label}>תאריך התחלה:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{startDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>תאריך סיום:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{endDate}</Text>
        </View>

        <Text style={styles.body}>
          תקופת הבלעדיות לא תעלה על 6 חודשים, בהתאם לתקנה 1 לתקנות המתווכים
          במקרקעין (פעולות שיווק), התשנ״ז-1997. הבלעדיות ניתנת לחידוש בהסכמת
          שני הצדדים בכתב בלבד.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>התחייבויות המתווך</Text>
        <Text style={styles.body}>
          1. המתווך מתחייב לבצע לפחות 5 פעולות שיווק מתוך הרשימה המצורפת
          כנספח, בהתאם לתקנות המתווכים (פעולות שיווק), התשס״ה-2004.
        </Text>
        <Text style={styles.body}>
          2. המתווך יפעל בשקידה סבירה לאיתור קונים פוטנציאליים לנכס.
        </Text>
        <Text style={styles.body}>
          3. המתווך ידווח ללקוח אחת לשבועיים לפחות על פעולות השיווק שבוצעו
          ועל תוצאותיהן.
        </Text>
        <Text style={styles.body}>
          4. המתווך ימסור ללקוח כל מידע מהותי שהגיע לידיעתו בקשר לנכס
          ולעסקה.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>התחייבויות הלקוח</Text>
        <Text style={styles.body}>
          1. הלקוח מתחייב שלא להעסיק מתווך אחר בתקופת הבלעדיות ושלא לנהל
          מו״מ ישירות עם קונים שהופנו על ידי המתווך.
        </Text>
        <Text style={styles.body}>
          2. הלקוח יאפשר למתווך גישה סבירה לנכס לצורך הצגתו לקונים
          פוטנציאליים.
        </Text>
        <Text style={styles.body}>
          3. הלקוח ימסור למתווך מידע מלא ונכון אודות הנכס, לרבות ליקויים
          ידועים ומצבו המשפטי.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>ביטול הבלעדיות</Text>
        <Text style={styles.body}>
          במקרה שהמתווך לא ביצע את פעולות השיווק הנדרשות בתקנות, רשאי הלקוח
          לבטל את הבלעדיות בהודעה בכתב של 14 ימים מראש. ביטול הבלעדיות אינו
          מבטל את ההתחייבות לתשלום דמי תיווך בגין לקוחות שהמתווך היה הגורם
          היעיל בהפנייתם.
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
            {clientSignature ? (
              <Image src={clientSignature} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.body}>חתימת המתווך:</Text>
            {agentSignature ? (
              <Image src={agentSignature} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
            <Text style={styles.small}>{agentName}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{agentName} | הסכם בלעדיות</Text>
          <Text style={styles.footerText}>הופק בתאריך {orderDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form2Exclusivity };
export type { Form2Props };
