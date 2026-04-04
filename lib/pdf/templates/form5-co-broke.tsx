import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../styles";

type Form5Props = {
  agentAName: string;
  licenseA: string;
  agentBName: string;
  licenseB: string;
  address: string;
  splitPercentA: number;
  splitPercentB: number;
  signA?: string;
  signB?: string;
};

function Form5CoBroke(props: Form5Props) {
  const {
    agentAName,
    licenseA,
    agentBName,
    licenseB,
    address,
    splitPercentA,
    splitPercentB,
    signA,
    signB,
  } = props;

  const today = new Date().toLocaleDateString("he-IL");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            הסכם שיתוף פעולה בין מתווכים
          </Text>
          <Text style={styles.headerSubtitle}>תאריך: {today}</Text>
        </View>

        <Text style={styles.title}>
          הסכם שיתוף פעולה בין מתווכים (Co-Broke MOU)
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>הצדדים להסכם</Text>

        <Text style={[styles.body, { fontWeight: 700, marginTop: 6 }]}>
          מתווך א׳:
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>שם:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {agentAName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מספר רישיון:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{licenseA}</Text>
        </View>

        <Text style={[styles.body, { fontWeight: 700, marginTop: 6 }]}>
          מתווך ב׳:
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>שם:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {agentBName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מספר רישיון:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{licenseB}</Text>
        </View>

        <Text style={styles.subtitle}>פרטי הנכס</Text>
        <View style={styles.row}>
          <Text style={styles.label}>כתובת הנכס:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>{address}</Text>
        </View>

        <Text style={styles.subtitle}>חלוקת עמלה</Text>
        <Text style={styles.body}>
          הצדדים מסכימים כי דמי התיווך שייגבו מהעסקה יחולקו ביניהם כדלקמן:
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>מתווך א׳:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {splitPercentA}%
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>מתווך ב׳:</Text>
          <Text style={[styles.value, styles.fieldHighlight]}>
            {splitPercentB}%
          </Text>
        </View>

        <View style={styles.spacer} />

        <Text style={styles.subtitle}>תנאי ההסכם</Text>
        <Text style={styles.body}>
          1. כל צד יפעל מול הלקוח שלו בלבד ולא ייצור קשר ישיר עם לקוחו של
          הצד השני ללא הסכמה מראש ובכתב.
        </Text>
        <Text style={styles.body}>
          2. חלוקת העמלה תבוצע תוך 7 ימי עסקים מיום קבלת דמי התיווך בפועל.
        </Text>
        <Text style={styles.body}>
          3. הסכם זה תקף לנכס המפורט לעיל בלבד ואינו מהווה שיתוף פעולה כללי
          בין הצדדים.
        </Text>
        <Text style={styles.body}>
          4. כל סכסוך הנובע מהסכם זה יועבר לגישור לפני נקיטת הליכים משפטיים.
        </Text>
        <Text style={styles.body}>
          5. הסכם זה ייכנס לתוקף עם חתימת שני הצדדים ויישאר בתוקף עד
          להשלמת העסקה או ביטולה.
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
            <Text style={styles.body}>חתימת מתווך א׳:</Text>
            {signA ? (
              <Image src={signA} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
            <Text style={styles.small}>{agentAName}</Text>
          </View>
          <View>
            <Text style={styles.body}>חתימת מתווך ב׳:</Text>
            {signB ? (
              <Image src={signB} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureArea}>
                <Text style={styles.signatureLabel}>חתימה</Text>
              </View>
            )}
            <Text style={styles.small}>{agentBName}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            הסכם שיתוף פעולה | {agentAName} & {agentBName}
          </Text>
          <Text style={styles.footerText}>הופק בתאריך {today}</Text>
        </View>
      </Page>
    </Document>
  );
}

export { Form5CoBroke };
export type { Form5Props };
