// src/components/HeroPage.js  (REPLACE ENTIRE FILE)

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
  useWindowDimensions,
  Linking, // ✅ WhatsApp redirect
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Text as SvgText, TextPath } from "react-native-svg";
import { useRouter } from "expo-router";

const IMG = {
  heroBg: require("../../assets/images/hero-bg.png"),
  tjIcon: require("../../assets/images/TJicon.png"),
  clock: require("../../assets/images/clock.png"),
  whatsapp: require("../../assets/images/whatsapp.png"),

  taxi: require("../../assets/images/taxi.png"),
  driver: require("../../assets/images/driver.png"),
  handshake: require("../../assets/images/handshake.png"),

  messenger: require("../../assets/images/messenger.png"),
  location: require("../../assets/images/location.png"),
  check: require("../../assets/images/check.png"),
};

export default function HeroPage() {
  const { width } = useWindowDimensions();
  const router = useRouter(); // ✅ NEW: navigation
  const T = (props) => <Text allowFontScaling={false} {...props} />;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  // ✅ PHONE-FIRST: on phones keep scale close to 1 (prevents "wonky" spacing)
  const isPhone = width < 520;
  const phoneBase = clamp(width, 320, 420);
  const desktopBase = clamp(width, 420, 980);
  const scale = isPhone ? phoneBase / 420 : desktopBase / 520; // tighter desktop growth

  const S = {
    padX: Math.round(16 * scale),
    maxWrap: 980,

    brandIcon: Math.round(80 * scale),
    brandName: Math.round(18 * scale),
    brandTag: Math.round(10 * scale),

    desc: Math.round(12.8 * scale),
    descLine: Math.round(18 * scale),

    pillText: Math.round(12 * scale),
    pillPadY: Math.round(8 * scale),
    pillPadX: Math.round(14 * scale),

    ctaText: Math.round(15 * scale),
    ctaPadY: Math.round(13 * scale),

    featureIcon: Math.round(34 * scale),
    featureText: Math.round(11.5 * scale),

    radiusPanel: Math.round(20 * scale),
    radiusCard: Math.round(18 * scale),

    cardTitle: Math.round(16.5 * scale),

    stepIcon: Math.round(46 * scale),
    stepText: Math.round(11.5 * scale),

    foot: Math.round(12.5 * scale),
  };

  // ✅ SVG sizing
  // ✅ Mobile curve tuned (desktop unchanged)
  const svgH = isPhone ? 120 : Math.round(110 * scale);

  // bigger + cleaner on mobile, desktop unchanged
  const titleMain = isPhone ? 50 : Math.round(38 * scale);
  const titleCity = isPhone ? 30 : 34;

  // ✅ blue line aligns to icon centers (not too low)
  const blueTop = Math.round(S.stepIcon * 0.45);

  const posterW = clamp(width, 360, 980);

  // ======================================================
  // ✅ WhatsApp Redirect (EDIT THESE TWO VALUES ONLY)
  // - phone in international format, no +, no spaces
  //   example Cameroon: "237699999999"
  // ======================================================
  const WA_NUMBER = "237679695205"; // 🔁 CHANGE THIS
  const WA_MESSAGE = "Bonjour "; // 🔁 CHANGE THIS

  const openWhatsApp = async () => {
    const text = encodeURIComponent(WA_MESSAGE);

    // Preferred on phones (opens app)
    const appUrl = `whatsapp://send?phone=${WA_NUMBER}&text=${text}`;

    // Works on desktop and as fallback
    const webUrl = `https://wa.me/${WA_NUMBER}?text=${text}`;

    try {
      const canOpen = await Linking.canOpenURL(appUrl);
      await Linking.openURL(canOpen ? appUrl : webUrl);
    } catch (e) {
      await Linking.openURL(webUrl);
    }
  };

  return (
    <ImageBackground
      source={IMG.heroBg}
      style={styles.bg}
      resizeMode="cover"
      imageStyle={styles.bgImg}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.wrap,
            {
              width: posterW,
              maxWidth: S.maxWrap,
              paddingHorizontal: S.padX,
            },
          ]}
        >
          {/* ===== BRAND ===== */}
          <View style={[styles.brandRow, { marginTop: 6 }]}>
            <Image
              source={IMG.tjIcon}
              style={{
                width: S.brandIcon,
                height: S.brandIcon,
                marginRight: Math.round(10 * scale),
              }}
              resizeMode="contain"
            />
            <View style={{ alignItems: "flex-start" }}>
              <T style={[styles.brandName, { fontSize: S.brandName }]}>TJ-DV</T>
              <T style={[styles.brandTag, { fontSize: S.brandTag }]}>
                Taxi Jeune sur Rendez-Vous
              </T>
            </View>
          </View>

          {/* ===== CURVED TITLE (CENTERED) ===== */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isPhone ? 2 : 4,
            }}
          >
            {/* this wrapper forces true centering */}
            <View style={{ width: "100%", alignItems: "center" }}>
              <Svg
                width="100%"
                height={svgH}
                viewBox="0 0 1100 260"
                preserveAspectRatio="xMidYMid meet"
                style={{ alignSelf: "center" }} // ✅ important
              >
                <Path
                  id="curve"
                  d={isPhone ? "M 40 200 Q 550 60 1060 200" : "M 20 205 Q 550 105 1080 205"}
                  fill="transparent"
                />

                <SvgText
                  fill="#0B2A3A"
                  fontSize={String(titleMain)}
                  fontWeight="900"
                  letterSpacing={isPhone ? "-0.5" : "6"}
                  textAnchor="middle" // ✅ ensure middle
                >
                  <TextPath
                    href="#curve"
                    xlinkHref="#curve"
                    startOffset="50%"
                    textAnchor="middle" // ✅ ensure middle
                    method="align" // ✅ better centering on some phones
                    spacing="auto"
                  >
                    Un taxi, sur rendez-vous.
                  </TextPath>
                </SvgText>

                <SvgText
                  x="550"
                  y={isPhone ? "238" : "225"}
                  textAnchor="middle"
                  fill="#E71E6F"
                  fontSize={String(titleCity)}
                  fontWeight="900"
                >
                  à Yaoundé
                </SvgText>
              </Svg>
            </View>
          </View>

          {/* ===== DESCRIPTION (TIGHTER) ===== */}
          <T
            style={[
              styles.desc,
              {
                fontSize: S.desc,
                lineHeight: S.descLine,
                marginTop: isPhone ? 4 : 8,
              },
            ]}
          >
            Course planifiée pour vos déplacements importants.{"\n"}
            Vous indiquez le lieu, la destination et l&apos;heure.{"\n"}
            Un opérateur organise le départ.
          </T>

          {/* ===== PILL ===== */}
          <View
            style={[
              styles.pill,
              {
                marginTop: isPhone ? 10 : 12,
                paddingVertical: S.pillPadY,
                paddingHorizontal: S.pillPadX,
              },
            ]}
          >
            <Image
              source={IMG.clock}
              style={{
                width: Math.round(18 * scale),
                height: Math.round(18 * scale),
                marginRight: Math.round(8 * scale),
              }}
              resizeMode="contain"
            />
            <T style={[styles.pillText, { fontSize: S.pillText }]}>
              Réservation au moins 1 heure à l&apos;avance
            </T>
          </View>

          {/* ===== CTA (NOW OPENS WHATSAPP) ===== */}
          <Pressable
            style={{ width: "92%", marginTop: isPhone ? 10 : 12 }}
            onPress={openWhatsApp}
          >
            <LinearGradient
              colors={["#39D97B", "#1FBF5D"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.cta, { paddingVertical: S.ctaPadY }]}
            >
              <View style={styles.ctaInner}>
                <View
                  style={[
                    styles.ctaIconCircle,
                    {
                      width: Math.round(38 * scale),
                      height: Math.round(38 * scale),
                      marginRight: Math.round(10 * scale),
                    },
                  ]}
                >
                  <Image
                    source={IMG.whatsapp}
                    style={{
                      width: Math.round(20 * scale),
                      height: Math.round(20 * scale),
                    }}
                    resizeMode="contain"
                  />
                </View>
                <T style={[styles.ctaText, { fontSize: S.ctaText }]}>
                  Réserver sur WhatsApp
                </T>
              </View>
            </LinearGradient>
          </Pressable>

          <T style={[styles.payment, { marginTop: 8, fontSize: 12 }]}>
            💰 Paiement uniquement après la course
          </T>

          {/* ✅ NEW: use existing buttons to go to Trust & Security page */}
          <Pressable
            style={{ width: "92%", marginTop: 10 }}
            onPress={() => router.push("/trust")}
          >
            <View
              style={{
                borderRadius: 999,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.8)",
                backgroundColor: "rgba(226, 233, 218, 0.55)",
                alignItems: "center",
              }}
            >
              <Text allowFontScaling={false} style={{ fontWeight: "900", color: "#0B2A3A" }}>
                Fiable & sécurisé
              </Text>
            </View>
          </Pressable>

          {/* ===== PANEL GROUP (LESS PADDING ON PHONE) ===== */}
          <View
            style={[
              styles.panelGroup,
              {
                marginTop: isPhone ? 10 : 14,
                borderRadius: S.radiusPanel,
                paddingTop: isPhone ? 8 : 10,
                paddingBottom: isPhone ? 10 : 12,
                paddingHorizontal: isPhone ? 10 : 12,
              },
            ]}
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.00)",
                "rgba(255,180,200,0.18)",
                "rgba(255,168,0,0.16)",
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[styles.panelInnerGlow, { borderRadius: S.radiusPanel }]}
            />

            {/* ===== FEATURES (COMPACT ROW) ===== */}
            <View style={[styles.featureRow, { marginTop: 2 }]}>
              <Feature
                icon={IMG.taxi}
                text={"Départ planifié,\nsans stress"}
                S={S}
                scale={scale}
                T={T}
              />
              <Feature
                icon={IMG.driver}
                text={"Chauffeurs\nsélectionnés"}
                S={S}
                scale={scale}
                T={T}
              />
              <Feature
                icon={IMG.handshake}
                text={"Service\nlocal et humain"}
                S={S}
                scale={scale}
                T={T}
              />
            </View>

            <View style={[styles.pinkDotsLine, { marginTop: 8, marginBottom: 10 }]} />

            {/* ===== COMMENT ÇA MARCHE CARD ===== */}
            <LinearGradient
              colors={["rgba(255,255,255,0.78)", "rgba(255,244,220,0.90)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[
                styles.card,
                {
                  borderRadius: S.radiusCard,
                  paddingVertical: isPhone ? 10 : 12,
                  paddingHorizontal: isPhone ? 10 : 12,
                },
              ]}
            >
              <View style={[styles.cardInnerGlow, { borderRadius: S.radiusCard }]} />

              <View style={[styles.cardTitleRow, { marginBottom: isPhone ? 6 : 8 }]}>
                <View style={[styles.shortPinkLine, { width: Math.round(56 * scale) }]} />
                <T style={[styles.cardTitle, { fontSize: S.cardTitle }]}>Comment ça marche</T>
                <View style={[styles.shortPinkLine, { width: Math.round(56 * scale) }]} />
              </View>

              <View style={{ width: "100%", position: "relative", paddingTop: 4 }}>
                <View
                  style={[
                    styles.blueLine,
                    {
                      top: blueTop,
                      left: Math.round(12 * scale),
                      right: Math.round(12 * scale),
                      height: Math.max(2, Math.round(3 * scale)),
                    },
                  ]}
                />

                <View style={styles.stepsRow}>
                  <Step icon={IMG.messenger} label={"1. Écrivez sur\nWhatsApp"} S={S} T={T} />
                  <Step icon={IMG.location} label={"2. Indiquez lieu\n& destination"} S={S} T={T} />
                  <Step icon={IMG.check} label={"3. L'opérateur\nconfirme"} S={S} T={T} />
                </View>
              </View>

              <T style={[styles.cardFoot, { fontSize: S.foot, marginTop: 10 }]}>
                Taxi sur réservation, organisé par des humains, pas de robots.
              </T>
            </LinearGradient>
          </View>

          {/* ===== FOOTER ===== */}
          <View style={[styles.footer, { marginTop: 12 }]}>
            <View>
              <T style={styles.footerLeftTop}>TJ-DV — Taxi Jeune sur Rendez-Vous</T>
              <T style={styles.footerLeftBottom}>Yaoundé</T>
            </View>

            <View style={styles.footerRight}>
              <Image
                source={IMG.whatsapp}
                style={{ width: 18, height: 18, marginRight: 8 }}
                resizeMode="contain"
              />
              <T style={styles.footerLink}>Contactez-nous</T>
            </View>
          </View>

          <View style={{ height: 14 }} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

/* ===== Small helper components ===== */
function Feature({ icon, text, S, scale, T }) {
  return (
    <View style={styles.featureItem}>
      <Image
        source={icon}
        style={{ width: S.featureIcon, height: S.featureIcon, marginRight: Math.round(6 * scale) }}
        resizeMode="contain"
      />
      <T style={[styles.featureText, { fontSize: S.featureText }]}>{text}</T>
    </View>
  );
}

function Step({ icon, label, S, T }) {
  return (
    <View style={styles.step}>
      <View style={styles.iconMask}>
        <Image source={icon} style={{ width: S.stepIcon, height: S.stepIcon }} resizeMode="contain" />
      </View>
      <T style={[styles.stepText, { fontSize: S.stepText }]}>{label}</T>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    minHeight: Platform.OS === "web" ? "100vh" : "100%",
  },
  bgImg: { alignSelf: "center" },
  scroll: {
    flexGrow: 1,
    paddingTop: 40, // ✅ was 10 (try 18–28)
    paddingBottom: 18,
    alignItems: "center",
  },

  wrap: { alignItems: "center" },

  brandRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: { fontWeight: "900", color: "#0B2A3A", letterSpacing: 0.6 },
  brandTag: { marginTop: -4, fontWeight: "800", color: "#0B2A3A", opacity: 0.92 },

  desc: {
    textAlign: "center",
    color: "#0B2A3A",
    opacity: 0.92,
    fontWeight: "600",
    maxWidth: 760,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE6F0",
    borderWidth: 2,
    borderColor: "rgba(231,30,111,0.20)",
    borderRadius: 999,
  },
  pillText: { fontWeight: "800", color: "#B80F4B" },

  cta: {
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  ctaInner: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  ctaIconCircle: {
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",
  },
  ctaText: { fontWeight: "900", color: "#fff" },

  payment: { fontWeight: "800", color: "#0B2A3A", opacity: 0.85 },

  panelGroup: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: "rgba(255, 230, 235, 0.35)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.45)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  panelInnerGlow: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },

  featureRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  featureText: { fontWeight: "900", color: "#0B2A3A", textAlign: "left" },

  pinkDotsLine: {
    width: "100%",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(231,30,111,0.55)",
  },

  card: {
    width: "100%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.55)",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    overflow: "hidden",
  },
  cardInnerGlow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  cardTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  shortPinkLine: { height: 3, borderRadius: 99, backgroundColor: "rgba(231,30,111,0.55)" },
  cardTitle: { marginHorizontal: 10, fontWeight: "900", color: "#0B2A3A" },

  iconMask: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },

  stepsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 2,
  },
  step: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
  stepText: {
    marginTop: 6,
    fontWeight: "900",
    color: "#0B2A3A",
    textAlign: "center",
  },

  cardFoot: { fontWeight: "900", textAlign: "center", color: "#0B2A3A", opacity: 0.95 },

  footer: {
    width: "100%",
    maxWidth: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  footerLeftTop: { fontSize: 12, fontWeight: "900", color: "#0B2A3A" },
  footerLeftBottom: { fontSize: 12, fontWeight: "900", color: "#0B2A3A" },
  footerRight: { flexDirection: "row", alignItems: "center" },
  footerLink: { fontSize: 12.5, fontWeight: "900", color: "#E71E6F" },
});
