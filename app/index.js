// app/index.js
import React from "react";
import { Stack } from "expo-router";
import HeroPage from "../src/components/HeroPage";



export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HeroPage />
    </>
  );
}





