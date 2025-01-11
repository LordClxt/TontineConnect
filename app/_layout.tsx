import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import React from "react";
export default function RootLayout() {

  const [fontLoaded] = useFonts({
    'Poppins-Bold':require('@/assets/fonts/Poppins-Bold.ttf')
  })

  return <Stack >
    <Stack.Screen name="(tabs)" options={{
      headerShown:false
    }} />
  </Stack>;
}
