import { Font } from "@react-pdf/renderer";

const HEBREW_FONT_FAMILY = "Heebo";

Font.register({
  family: HEBREW_FONT_FAMILY,
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiS2cckOnz02SXQ.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/heebo/v26/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yucckOnz02SXQ.ttf",
      fontWeight: 700,
    },
  ],
});

export { HEBREW_FONT_FAMILY };
