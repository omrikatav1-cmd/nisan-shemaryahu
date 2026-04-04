import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form6Props = {
  agentSign?: string;
  clientSign?: string;
  selectedActions: string[];
};

const MARKETING_ACTIONS = [
  "פרסום הנכס באתרי אינטרנט המתמחים בנדל״ן (יד2, מדלן, הומלס וכד׳)",
  "פרסום הנכס ברשתות חברתיות (פייסבוק, אינסטגרם) בקבוצות רלוונטיות",
  "הצבת שלט ״למכירה״ / ״להשכרה״ על הנכס או בסביבתו",
  "שליחת מידע על הנכס לרשת מתווכים ושיתופי פעולה עם מתווכים נוספים",
  "הפצת מידע על הנכס ללקוחות רשומים במאגר המתווך",
  "פרסום הנכס בעיתונות מקומית או ארצית",
  "הכנת חומרים שיווקיים מקצועיים (צילום מקצועי, סרטון, תוכנית קומה)",
  "קיום ימי בית פתוח להצגת הנכס",
  "פרסום הנכס באתר האינטרנט של המתווך",
  "הפצת פליירים ודפי מידע בסביבת הנכס",
];

function Form6Marketing(props: Form6Props) {
  const { agentSign, clientSign, selectedActions } = props;

  const today = new Date().toLocaleDateString("he-IL");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>נספח פעולות שיווק</Text>
          <Text style={styles.headerSubtitle}>תאריך: {today}</Text>
        </View>

        <Text style={styles.title}>
          נספח פעולות שיווק (חובה בהסכם בלעדיות)
        </Text>

        <Text style={styles.body}>
          בהתאם לתקנות המתווכים במקרקעין (פעולות שיווק), התשס״ה-2004, על המתווך
          לבצע לפחות 5 פעולות שיווק מתוך הרשימה שלהלן. פעולות שיווק אלו מהוות
          תנאי לתוקפה של הבלעדיות.
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>פעולות שיווק שנבחרו</Text>
        <Text style={styles.small}>
          (יש לסמן לפחות 5 פעולות שהמתווך מתחייב לבצע)
        </Text>

        <View style={styles.spacer} />

        {MARKETING_ACTIONS.map((action, index) => {
          const isSelected = selectedActions.includes(action);
          return (
            <View key={index} style={styles.checkboxRow}>
              <View
                style={isSelected ? styles.checkboxChecked : styles.checkbox}
              />
              <Text style={[styles.body, { flex: 1 }]}>
                {index + 1}. {action}
              </Text>
            </View>
          );
        })}

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>הצהרה</Text>
        <Text style={styles.body}>
          המתווך מתחייב לבצע את פעולות השיווק המסומנות לעיל בתוך תקופת
          הבלעדיות. אי ביצוע הפעולות עלול להוות עילה לביטול הבלעדיות בהתאם
          לתקנות.
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
            {clientSign ? (
              <Image src={clientSign} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.body}>חתימת המתווך:</Text>
            {agentSign ? (
              <Image src={agentSign} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            נספח פעולות שיווק | תקנות המתווכים התשס״ה-2004
          </Text>
          <Text style={styles.footerText}>הופק בתאריך {today}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form6Marketing, MARKETING_ACTIONS };
export type { Form6Props };
