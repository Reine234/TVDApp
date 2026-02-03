import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, Linking, Alert } from "react-native";


export default function WhatsAppButton({
  phone = "237679695205", // ✅ put your real number here once
  message = "Bonjour TJ-DV, je veux réserver un taxi sur rendez-vous.",
  label = "Réserver sur WhatsApp",
  style,
  textStyle,
  showIcon = true,
  iconSource,
}) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;

  const openWhatsApp = async () => {
    try {
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
    <TouchableOpacity activeOpacity={0.85} onPress={openWhatsApp} style={[S.btn, style]}>
      {showIcon && iconSource ? <Image source={iconSource} style={S.icon} resizeMode="contain" /> : null}
      <Text style={[S.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  btn: {
    backgroundColor: "#1DB954",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  icon: {
    width: 18,
    height: 18,
  },
});
