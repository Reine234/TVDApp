// src/components/HeroPage.js

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
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Text as SvgText, TextPath } from "react-native-svg";
import { useRouter } from "expo-router";

import { TrustAndSecuritySection } from "../components/TrustAndSecurityPage";

const IMG = {
  heroBg: require("../../assets/images/hero-bg.png"),
  heroBgMobile: require("../../assets/images/hero-bg-mobile.png"),

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
  const { width, height } = useWindowDimensions();
  const router = useRouter();
 const T = (props) => <Text allowFontScaling={false} style={{ fontFamily: 'System' }} {...props} />;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  const isPhone = width < 420;
  const phoneBase = clamp(width, 320, 420);
  const desktopBase = clamp(width, 420, 980);
  const scale = isPhone ? phoneBase / 410 : desktopBase / 520;

  const m = isPhone ? 0.92 : 1;
  const heroBgSource = isPhone ? IMG.heroBgMobile : IMG.heroBg;

  const S = {
    padX: Math.round(16 * scale),
    maxWrap: 980,

    brandIcon: Math.round(100 * scale * (isPhone ? 1.35 : 1)),
    brandName: Math.round(18 * scale * (isPhone ? 1.25 : 1)),
    brandTag: Math.round(10 * scale * (isPhone ? 1.25 : 1)),

    desc: Math.round(12.8 * scale * m),
    descLine: Math.round(18 * scale * m),

    pillText: Math.round(12 * scale * (isPhone ? 1.12 : 1)),
    pillPadY: Math.round(8 * scale * (isPhone ? 1.1 : 1)),
    pillPadX: Math.round(14 * scale * (isPhone ? 1.05 : 1)),

    ctaText: Math.round(15 * scale * (isPhone ? 1.08 : 1)),
    ctaPadY: Math.round(13 * scale * (isPhone ? 1.08 : 1)),

    featureIcon: Math.round(100 * scale),
    featureText: Math.round(11.5 * scale),

    radiusPanel: Math.round(20 * scale),
    radiusCard: Math.round(18 * scale),

    cardTitle: Math.round(16.5 * scale),

    stepIcon: Math.round(100 * scale),
    stepText: Math.round(15.5 * scale),

    foot: Math.round(12.5 * scale),
  };

  const titleMain = isPhone ? 76 : Math.round(38 * scale);
  const titleCity = isPhone ? 45 : 34;
  const svgH = isPhone ? 140 : Math.round(110 * scale);

  const blueTop = Math.round(S.stepIcon * 0.45);
  const posterW = clamp(width, 360, 980);

  const mobileHeroWrap = isPhone
    ? {
        minHeight: Math.round(height * 0.60),
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }
    : null;

  const WA_NUMBER = "237679971134";
const WA_MESSAGE = "Bonjour TJ-DV, je veux réserver un taxi sur rendez-vous.";

const openWhatsApp = async () => {
  const text = encodeURIComponent(WA_MESSAGE);
  
  // Try WhatsApp direct URL first (works on most devices)
  const appUrl = `whatsapp://send?phone=${WA_NUMBER}&text=${text}`;
  
  try {
    // Try to open WhatsApp directly
    await Linking.openURL(appUrl);
  } catch (e) {
    // If WhatsApp direct fails, try the web URL as fallback
    const webUrl = `https://wa.me/${WA_NUMBER}?text=${text}`;
    await Linking.openURL(webUrl);
  }
};
return (
  <ImageBackground
    source={heroBgSource}
    style={styles.bg}
    resizeMode="cover"
    imageStyle={[
      styles.bgImg,
      isPhone && {
        resizeMode: "cover",
        alignSelf: "center",
        top: -24,
        transform: [{ scale: 1.2 }],
      },
    ]}
  >
    {/* DARK OVERLAY - ONLY AFFECTS BACKGROUND */}
    <View style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.15)', // 45% black overlay = brightness(0.55)
    }} />
    
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
            alignSelf: "center",
            // REMOVED zIndex: 2 - not needed
          },
        ]}
      >
        {/* rest of your content */}
          {/* HERO TOP AREA */}
          <View style={mobileHeroWrap}>
            {/* BRAND */}
            <View style={[styles.brandRow, { marginTop: isPhone ? 2 : 2 }]}>
              <Image
                source={IMG.tjIcon}
                style={{
                  width: S.brandIcon,
                  height: S.brandIcon,
                  marginRight: Math.round(8 * scale),
                }}
                resizeMode="contain"
              />
              <View style={{ alignItems: "flex-start" }}>
                <T style={[styles.brandName, { fontSize: S.brandName }]}>
                  TJ-DV
                </T>
                <T style={[styles.brandTag, { fontSize: S.brandTag }]}>
                  Taxi Jeune sur Rendez-Vous
                </T>
              </View>
            </View>

            {/* TITLE */}
            {isPhone ? (
              <View style={{ 
                width: "100%", 
                alignItems: "center", 
                marginTop: 8,
                marginBottom: 4,
              }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 48,
                    fontWeight: "900",
                    color: "#0B2A3A",
                    textAlign: "center",
                    lineHeight: 52,
                    letterSpacing: -0.5,
                    width: "100%",
                    flexShrink: 1,
                    paddingHorizontal: 0,
                    fontFamily: 'System',
                  }}
                  numberOfLines={2}
                  adjustsFontSizeToFit={false}
                >
                  Un taxi, sur rendez-vous.
                </Text>

                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 2,
                    fontSize: 36,
                    fontWeight: "900",
                    color: "#E71E6F",
                    textAlign: "center",
                    lineHeight: 42,
                    fontFamily: 'System',
                  }}
                  numberOfLines={1}
                >
                  à Yaoundé
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Svg
                    width="100%"
                    height={svgH}
                    viewBox="0 0 1100 260"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ alignSelf: "center" }}
                  >
                    <Path
                      id="curve"
                      d={"M 20 205 Q 550 105 1080 205"}
                      fill="transparent"
                    />

                    <SvgText
                      fill="#0B2A3A"
                      fontSize={String(Math.round(38 * scale))}
                      fontWeight="900"
                      letterSpacing={"6"}
                      textAnchor="middle"
                    >
                      <TextPath
                        href="#curve"
                        xlinkHref="#curve"
                        startOffset="50%"
                        textAnchor="middle"
                        method="align"
                        spacing="auto"
                      >
                        Un taxi, sur rendez-vous.
                      </TextPath>
                    </SvgText>

                    <SvgText
                      x="550"
                      y={"225"}
                      textAnchor="middle"
                      fill="#E71E6F"
                      fontSize={String(34)}
                      fontWeight="900"
                    >
                      à Yaoundé
                    </SvgText>
                  </Svg>
                </View>
              </View>
            )}

            {/* DESCRIPTION */}
            <T
              style={[
                styles.desc,
                {
                  fontSize: isPhone ? 18 : S.desc,
                  lineHeight: isPhone ? 26 : S.descLine,
                  textAlign: "center",
                  alignSelf: "center",
                  width: isPhone ? "100%" : "auto",
                  marginTop: isPhone ? 16 : 8,
                  marginBottom: isPhone ? 8 : 0,
                  paddingHorizontal: isPhone ? 4 : 0,
                },
              ]}
            >
              Course planifiée pour vos déplacements importants.{"\n"}
              Vous indiquez le lieu, la destination et l&apos;heure.{"\n"}
              Un opérateur organise le départ.
            </T>

            {/* PILL */}
            <View
              style={[
                styles.pill,
                {
                  marginTop: isPhone ? 16 : 10,
                  paddingVertical: S.pillPadY,
                  paddingHorizontal: S.pillPadX,
                  alignSelf: "center",
                },
              ]}
            >
              <Image
                source={IMG.clock}
                style={{
                  width: Math.round(18 * scale * (isPhone ? 1.08 : 1)),
                  height: Math.round(18 * scale * (isPhone ? 1.08 : 1)),
                  marginRight: Math.round(8 * scale),

                }}
                resizeMode="cover"
              />

              <T style={[styles.pillText, { fontSize: S.pillText } ,{ textAlign: "center" }]}>
                Réservation au moins 1 heure à l&apos;avance
              </T>
            </View>

            {/* CTA */}
            {isPhone && <View style={{ height: 12 }} />}
            <Pressable
              style={{
                width: isPhone ? "90%" : "92%",
                marginTop: isPhone ? 16 : 12,
                alignSelf: "center",
              }}
              onPress={openWhatsApp}
            >
              <LinearGradient
                colors={["#39D97B", "#1FBF5D"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.cta,
                  { paddingVertical: S.ctaPadY, borderRadius: 999 },
                ]}
              >
                <View style={styles.ctaInner}>
                  <View
                    style={[
                      styles.ctaIconCircle,
                      {
                        width: Math.round(38 * scale * (isPhone ? 1.08 : 1)),
                        height: Math.round(38 * scale * (isPhone ? 1.08 : 1)),
                        marginRight: Math.round(10 * scale),
                      },
                    ]}
                  >
                    <Image
                      source={IMG.whatsapp}
                      style={{
                        width: Math.round(20 * scale * (isPhone ? 1.08 : 1)),
                        height: Math.round(20 * scale * (isPhone ? 1.08 : 1)),
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

            <T style={[styles.payment, { marginTop: 10, fontSize: 12, textAlign: "center" }]}>
              💰 Paiement uniquement après la course
            </T>
          </View>



          {/* PANEL GROUP - FIXED: "Comment ça marche" now OUTSIDE the white card */}
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

            {/* FEATURES SECTION */}
            <View
              style={[
                styles.featuresWhiteBox,
                isPhone
                  ? { paddingVertical: 14, paddingHorizontal: 12 }
                  : { paddingVertical: 12, paddingHorizontal: 14 },
              ]}
            >
              <View
                style={[
                  styles.featureRow,
                  {
                    flexDirection: isPhone ? "column" : "row",
                    alignItems: isPhone ? "flex-start" : "center",
                    justifyContent: isPhone ? "flex-start" : "center",
                    gap: isPhone ? 14 : 40,
                    paddingLeft: isPhone ? 6 : 0,
                    paddingRight: isPhone ? 6 : 0,
                  },
                ]}
              >
                <Feature 
                  icon={IMG.taxi} 
                  text={"Départ planifié,\nsans stress"} 
                  S={S} 
                  scale={scale} 
                  T={T} 
                  isPhone={isPhone} 
                  isLast={false}
                />
                <Feature 
                  icon={IMG.driver} 
                  text={"Chauffeurs\nsélectionnés"} 
                  S={S} 
                  scale={scale} 
                  T={T} 
                  isPhone={isPhone} 
                  isLast={false} 
                />
                <Feature 
                  icon={IMG.handshake} 
                  text={"Service\nlocal et humain"} 
                  S={S} 
                  scale={scale} 
                  T={T} 
                  isPhone={isPhone} 
                  isLast={true}
                />
              </View>
            </View>

            <View style={[styles.pinkDotsLine, { marginTop: 8, marginBottom: 10 }]} />

            {/* "COMMENT ÇA MARCHE" TITLE - NOW OUTSIDE THE WHITE CARD */}
            <View style={[styles.cardTitleRow, { marginBottom: isPhone ? 8 : 10 }]}>
            
              <T 
                style={[
                  styles.cardTitle, 
                  { 
                    fontSize: isPhone ? S.cardTitle * 1.5 : S.cardTitle * 1.5, 
                    textAlign: "center", 
                    marginHorizontal: 4,
                    flexShrink: 1,
                  }
                ]}
               
                adjustsFontSizeToFit={false}
              >
             
                Comment ça marche ?
              </T>
              
            </View>

            {/* STEPS CARD - WHITE BACKGROUND ONLY FOR STEPS */}
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

              <View style={{ width: "100%", position: "relative", paddingTop: 4 }}>
                {isPhone ? (
                  <View style={{ width: "100%", marginTop: 6 }}>
                    {/* STEP 1 */}
                    <View style={styles.stepVRow}>
                      <View style={[styles.stepVCircle, { width: Math.round(48 * scale), height: Math.round(48 * scale) }]}>
                        <Image
                          source={IMG.messenger}
                          resizeMode="contain"
                          style={{ width: Math.round(150 * scale * 0.62), height: Math.round(150 * scale * 0.62) }}
                        />
                      </View>
                      <T style={[styles.stepVText, { fontSize: Math.round(16 * scale) }]}>
                        1. Écrivez sur WhatsApp
                      </T>
                    </View>
                    <View style={styles.stepDivider} />

                    {/* STEP 2 */}
                    <View style={styles.stepVRow}>
                      <View style={[styles.stepVCircle, { width: Math.round(48 * scale), height: Math.round(48 * scale) }]}>
                        <Image
                          source={IMG.location}
                          resizeMode="contain"
                          style={{ width: Math.round(150 * scale * 0.62), height: Math.round(150 * scale * 0.62) }}
                        />
                      </View>
                      <T style={[styles.stepVText, { fontSize: Math.round(16 * scale) }]}>
                        2. Indiquez lieu & destination
                      </T>
                    </View>
                    <View style={styles.stepDivider} />

                    {/* STEP 3 */}
                    <View style={styles.stepVRow}>
                      <View style={[styles.stepVCircle, { width: Math.round(48 * scale), height: Math.round(48 * scale) }]}>
                        <Image
                          source={IMG.check}
                          resizeMode="contain"
                          style={{ width: Math.round(150 * scale * 0.62), height: Math.round(150 * scale * 0.62) }}
                        />
                      </View>
                      <T style={[styles.stepVText, { fontSize: Math.round(16 * scale) }]}>
                        3. L&apos;opérateur confirme
                      </T>
                    </View>
                  </View>
                ) : (
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
                )}
              </View>

              <T style={[styles.cardFoot, { fontSize: S.foot, marginTop: 10 }]}>
                Taxi sur réservation, organisé par des humains, pas de robots.
              </T>
            </LinearGradient>
          </View>

          <View style={{ marginTop: 16, width: "100%" }}>
            <TrustAndSecuritySection />
          </View>

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
function Feature({ icon, text, S, scale, T, isPhone, isLast }) {
  // Mobile - VERTICAL layout with MUCH BIGGER icons
  if (isPhone) {
    const iconSize = Math.round(80 * scale); // ✅ INCREASED from 70 to 90 for MUCH BIGGER icons
    const circleSize = Math.round(90 * scale); // Circle matches icon size
    
    return (
      <View
        style={[
          styles.featureItem,
          {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 18, // More vertical padding for bigger icons
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: "rgba(11,42,58,0.12)",
          },
        ]}
      >
        <View
          style={[
            styles.featureIconCircle,
            {
              width: circleSize * 0.6,
              height: circleSize * 0.6,
              marginRight: 20,
            },
          ]}
        >
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: iconSize * 1.2, // Slightly smaller inside circle for breathing room
              height: iconSize * 1.2,
            }}
          />
        </View>

        <T
          style={{
            fontSize: Math.round(20 * scale), // Bigger text to match
            lineHeight: Math.round(24 * scale),
            fontWeight: "900",
            color: "#0B2A3A",
            textAlign: "left",
            flex: 1,
          }}
        >
          {text}
        </T>
      </View>
    );
  }

 
  // Desktop - HORIZONTAL layout
  return (
    <View style={[styles.featureItem, { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
      <View style={{ marginRight: Math.round(10 * scale) }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ width: S.featureIcon, height: S.featureIcon }}
        />
      </View>
      <T style={[styles.featureText, { fontSize: S.featureText }]}>
        {text}
      </T>
    </View>
  );
}

// Replace your Step component with this
function Step({ icon, label, S, T }) {
  return (
    <View style={styles.step}>
      <View style={[styles.iconMask, { 
        paddingHorizontal: 4,  // Reduced from 8
        paddingVertical: 2,     // Reduced from 4
      }]}>
        <Image 
          source={icon} 
          style={{ 
            width: S.stepIcon * 0.75,  // Slightly smaller icon to fit in reduced background
            height: S.stepIcon * 0.75 
          }} 
          resizeMode="contain" 
        />
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
    paddingTop: 10,
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

  featuresWhiteBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.70)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  panelGroup: {
    width: "100%",
    maxWidth: 1000,
    
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

  cardTitleRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  shortPinkLine: { 
    height: 3, 
    borderRadius: 99, 
    backgroundColor: "rgba(253, 250, 251, 0.55)",
  },
  cardTitle: { 
    marginHorizontal: 10, 
    fontWeight: "900", 
    color: "#0B2A3A",
    flexShrink: 1,
  },

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

  stepVRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  stepVCircle: {
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.60)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.75)",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  stepVText: {
    flex: 1,
    fontWeight: "900",
    color: "#0B2A3A",
  },

  stepDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(11,42,58,0.12)",
  },
  
  cardFoot: { fontWeight: "900", textAlign: "center", color: "#0B2A3A", opacity: 0.95 },

  featureIconCircle: {
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.75)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

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