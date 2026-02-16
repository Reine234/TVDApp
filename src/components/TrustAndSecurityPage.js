// src/Components/TrustAndSecurityPage.js
import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Linking,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";

/* ======================================================
   TRUST & SECURITY PAGE (ONE FILE)
   - Painted top bands (NO green.png/orange.png)
   - Wavy separator
   - Multi-color confetti
   - Cards: side-by-side on wide screens, stacked on small phones
   - FIXED: mobile scaling (no tiny UI on Expo Go)
   - FIXED: taxi icon visual size + position (same level as shield)
====================================================== */

const IMG = {

  shield: require("../../assets/images/shield-card.png"),
  taxi: require("../../assets/images/taxi-icon.png"),
  check: require("../../assets/images/check.png"),
};

/* ======================================================
   ✅ NEW: Reusable content block (no ScrollView)
====================================================== */
function TrustAndSecurityContent() {
  const { width } = useWindowDimensions();

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // ✅ Make phones the baseline (so Expo Go doesn't shrink everything)
  const posterW = clamp(width, 360, 980);
  const rawScale = posterW / 420;

  // ✅ Prevent desktop from becoming comically huge
  const scale = clamp(rawScale, 0.85, 1.25);

  const GAP = width < 420 ? 12 : Math.round(22 * scale);
  const PADX = Math.round(18 * scale);

  // stack cards on narrow phones
  const stackCards = width < 720;

  // ✅ WhatsApp redirect (EDIT ONLY THIS IF YOU WANT)
  const WHATSAPP_PHONE = "237679695205"; // <-- put your number (no +, no spaces)
  const WHATSAPP_MESSAGE =
    "Bonjour TJ-DV, je veux réserver un taxi sur rendez-vous.";

  const openWhatsApp = async () => {
    try {
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE
      )}`;
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert("WhatsApp", "Impossible d’ouvrir WhatsApp sur cet appareil.");
        return;
      }
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("Erreur", "Impossible d’ouvrir WhatsApp.");
    }
  };

  return (
    <View style={S.stage}>
      <View style={[S.poster, { width: posterW, paddingHorizontal: PADX }]}>
        {/* ===== TITLE ===== */}
        <Text
          allowFontScaling={false}
          style={[S.title, { fontSize: Math.round(36 * scale) }]}
        >
          Fiable et sécurisé.
        </Text>

        <Text
          allowFontScaling={false}
          style={[
            S.paragraph,
            {
              fontSize: Math.round(18 * scale),
              lineHeight: Math.round(20 * scale),
            },
          ]}
        >
          Chauffeurs identifiés et vérifiés :{"\n"}
          votre sécurité est assurée.{"\n\n"}
          Taxis sélectionnés et contrôlés : vous{"\n"}
          voyagez en toute tranquillité.
        </Text>

        {/* ===== CARDS ===== */}
        <View
          style={[
            S.cardsRow,
            {
              gap: GAP,
              marginTop: Math.round(22 * scale),
              flexDirection: stackCards ? "column" : "row",
            },
          ]}
        >
          <TrustCard
            scale={scale}
            stackCards={stackCards}
            variant="green"
            icon={IMG.shield}
            heading={"Chauffeurs fiables\net identifiés"}
            bullets={[
              "Chauffeurs pros, identifiés et vérifiés",
              "Interventions rapides si nécessaire",
            ]}
          />

          <TrustCard
            scale={scale}
            stackCards={stackCards}
            variant="orange"
            icon={IMG.taxi}
            heading={"Taxis propres\net confortables"}
            bullets={[
              "Taxis sélectionnés et contrôlés",
              "Gage de confort et de propreté",
            ]}
          />
        </View>

        {/* ===== BOTTOM ===== */}
        <View style={[S.bottom, { marginTop: Math.round(22 * scale) }]}>
          <Text
            allowFontScaling={false}
            style={[
              S.bottomPara,
              {
                fontSize: Math.round(18 * scale),
                lineHeight: Math.round(18 * scale),
              },
            ]}
          >
            TJ-DV s’engage pour votre tranquillité{"\n"}et votre bien-être.
          </Text>

          <TouchableOpacity
            style={[
              S.whatsappButton,
              {
                marginTop: Math.round(14 * scale),
                paddingVertical: Math.round(12 * scale),
                paddingHorizontal: Math.round(28 * scale),
              },
            ]}
            activeOpacity={0.85}
            onPress={openWhatsApp}
          >
            <Text
              allowFontScaling={false}
              style={[S.whatsappText, { fontSize: Math.round(16 * scale) }]}
            >
              Réserver sur WhatsApp
            </Text>
          </TouchableOpacity>

          <Text
            allowFontScaling={false}
            style={[S.paymentNote, { marginTop: Math.round(10 * scale) }]}
          >
            Paiement uniquement après la course
          </Text>
        </View>

        <View style={{ height: 28 }} />
      </View>
    </View>
  );
}

/* ======================================================
   ✅ Default page export (kept same behavior)
====================================================== */
export default function TrustAndSecurityPage() {
  return (
    <ImageBackground source={IMG.bg} style={S.page} resizeMode="cover">
      <ScrollView
        contentContainerStyle={S.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TrustAndSecurityContent />
      </ScrollView>
    </ImageBackground>
  );
}

/* ======================================================
   ✅ NEW: Embedded section export (for HeroPage)
   - No ScrollView (important)
====================================================== */
export function TrustAndSecuritySection() {
  return (
    <ImageBackground source={IMG.bg} style={S.embedBg} resizeMode="cover">
      <TrustAndSecurityContent />
    </ImageBackground>
  );
}

/* ======================================================
   TRUST CARD
====================================================== */
function TrustCard({ scale, stackCards, icon, heading, bullets, variant }) {
  const isGreen = variant === "green";
  const isTaxi = variant === "orange";

  // ✅ Thicker top band
  const TOP_H = Math.round(140 * scale);
  const WAVE_H = 60;

  // ✅ Same icon BOX for both cards (so they match)
  const ICON_BOX = Math.round(150 * scale);

  // ✅ Taxi PNG usually has more empty padding → visually smaller
  const iconInnerScale = isTaxi ? 1.18 : 1.0;

  // ✅ Put icons on the same horizontal line near the wave
  const iconCenterY =
    TOP_H - Math.round(WAVE_H * 0.55) - Math.round(ICON_BOX * 0.15);

  // ✅ Taxi should be a bit LOWER than it was
  const extraDrop = isTaxi ? Math.round(10 * scale) : 0;

  const bandSolid = isGreen
    ? "hsla(128, 83%, 69%, 0.95)"
    : "rgba(255, 175, 60, 0.95)";
  const bandFade = isGreen
    ? "rgba(103, 216, 118, 0.45)"
    : "rgba(255, 175, 60, 0.45)";
  const waveStroke = isGreen
    ? "rgba(40, 170, 85, 0.45)"
    : "rgba(235, 140, 0, 0.45)";

  // card width behavior
  const outerStyle = stackCards
    ? { width: "100%", maxWidth: 520 }
    : { flex: 1, maxWidth: 460 };

  return (
    <View style={[S.cardOuter, outerStyle]}>
      <View style={S.card}>
        {/* TOP BAND */}
        <View style={[S.cardTop, { height: TOP_H }]}>
          <View style={[S.topPaint, { backgroundColor: bandSolid }]} />
          <View style={[S.topPaintFade, { backgroundColor: bandFade }]} />

          <View style={S.shineSweep} />
          <Confetti />
          <Wave stroke={waveStroke} />

          {/* ICON (same box, same level) */}
          <View
            pointerEvents="none"
            style={[
              S.iconBox,
              {
                width: ICON_BOX,
                height: ICON_BOX,
                left: "50%",
                top: iconCenterY - ICON_BOX / 2 + extraDrop,
                marginLeft: -ICON_BOX / 2,
              },
            ]}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={[
                S.iconImg,
                {
                  width: ICON_BOX,
                  height: ICON_BOX,
                  transform: [{ scale: iconInnerScale }],
                },
              ]}
            />
          </View>
        </View>

        {/* BODY */}
        <View style={[S.cardBody, { paddingTop: Math.round(16 * scale) }]}>
          <Text
            allowFontScaling={false}
            style={[S.cardHeading, { fontSize: Math.round(16 * scale) }]}
          >
            {heading}
          </Text>

          <View
            style={{
              marginTop: Math.round(12 * scale),
              gap: Math.round(12 * scale),
            }}
          >
            {bullets.map((b, i) => (
              <View key={i} style={S.bulletRow}>
                <View
                  style={[
                    S.checkCircle,
                    {
                      width: Math.round(22 * scale),
                      height: Math.round(22 * scale),
                    },
                  ]}
                >
                  <Image
                    source={IMG.check}
                    resizeMode="contain"
                    style={{
                      width: Math.round(12 * scale),
                      height: Math.round(12 * scale),
                      tintColor: "#FFFFFF",
                    }}
                  />
                </View>

                <Text
                  allowFontScaling={false}
                  style={[
                    S.bulletText,
                    {
                      fontSize: Math.round(12.5 * scale),
                      lineHeight: Math.round(16 * scale),
                    },
                  ]}
                >
                  {b}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

/* ======================================================
   WAVY SEPARATOR
====================================================== */
function Wave({ stroke }) {
  return (
    <View style={S.waveWrap}>
      <Svg
        width="100%"
        height="60"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
      >
        <Path
          d="M0,25 C70,55 130,5 200,28 C270,52 330,10 400,30 L400,60 L0,60 Z"
          fill="rgba(255,255,255,0.92)"
        />
        <Path
          d="M0,26 C70,54 130,8 200,29 C270,51 330,12 400,31"
          fill="transparent"
          stroke={stroke}
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
}

/* ======================================================
   CONFETTI
====================================================== */
function Confetti() {
  return (
    <View pointerEvents="none" style={S.confetti}>
      <View style={[S.dot, { left: 16, top: 16, backgroundColor: "#FFFFFF" }]} />
      <View style={[S.dot, { left: 42, top: 22, backgroundColor: "#00C2FF" }]} />
      <View style={[S.dot, { right: 18, top: 18, backgroundColor: "#FF4FA0" }]} />
      <View style={[S.dot, { right: 44, top: 30, backgroundColor: "#FFD100" }]} />

      <View style={[S.star, { left: 26, top: 42, backgroundColor: "#FFD100" }]} />
      <View style={[S.star, { right: 28, top: 44, backgroundColor: "#00C2FF" }]} />
      <View style={[S.starSmall, { left: 70, top: 18, backgroundColor: "#FF4FA0" }]} />
      <View style={[S.starSmall, { right: 70, top: 20, backgroundColor: "#FFFFFF" }]} />
    </View>
  );
}

/* ======================================================
   STYLES
====================================================== */
const S = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    minHeight: Platform.OS === "web" ? "100vh" : "100%",
  },

  // ✅ NEW: for embedding inside HeroPage (no "full page" sizing)
  embedBg: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },

  scroll: { paddingBottom: 30 },
  stage: { width: "100%", alignItems: "center", paddingTop: 26 },
  poster: { alignItems: "center" },

  title: { fontWeight: "900", textAlign: "center", color: "#0B2A3A" },
  paragraph: {
    marginTop: 12,
    textAlign: "center",
    fontWeight: "700",
    color: "#0B2A3A",
    opacity: 0.95,
  },

  cardsRow: {
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },

  cardOuter: {
    alignSelf: "center",
  },
  card: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.65)",
    backgroundColor: "rgba(255,255,255,0.92)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },

  cardTop: { width: "100%", position: "relative", overflow: "hidden" },
  topPaint: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "72%",
  },
  topPaintFade: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "44%",
    height: "56%",
  },

  shineSweep: {
    position: "absolute",
    left: -40,
    top: 10,
    width: 180,
    height: 52,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.28)",
    transform: [{ rotate: "-12deg" }],
  },

  waveWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 60,
  },

  iconBox: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImg: { alignSelf: "center" },

  confetti: { position: "absolute", left: 0, right: 0, top: 0, height: 90 },
  dot: { position: "absolute", width: 9, height: 9, borderRadius: 999, opacity: 0.9 },
  star: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 3,
    transform: [{ rotate: "18deg" }],
    opacity: 0.85,
  },
  starSmall: {
    position: "absolute",
    width: 9,
    height: 9,
    borderRadius: 2,
    transform: [{ rotate: "-12deg" }],
    opacity: 0.75,
  },

  cardBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
  },

  cardHeading: { fontWeight: "900", textAlign: "center", color: "#0B2A3A" },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  checkCircle: {
    borderRadius: 999,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  bulletText: { flex: 1, fontWeight: "900", color: "#0B2A3A" , fontSize: 60},

  bottom: { width: "100%", alignItems: "center" },
  bottomPara: { textAlign: "center", fontWeight: "900", color: "#0B2A3A" },
  heading:{
    fontSize: 15
  },

  bullets: {
    fontSize: 13
  },
  whatsappButton: {
    backgroundColor: "#1DB954",
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  whatsappText: { color: "#fff", fontWeight: "900" },

  paymentNote: { fontSize: 12, fontWeight: "800", color: "#0B2A3A", opacity: 0.9 },
});