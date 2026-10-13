import { Stack } from "expo-router";
import "../global.css";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useFonts,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from "@expo-google-fonts/sora";
import { colors, fonts } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded]);

  if (!fontLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.brand },
            headerTintColor: colors.white,
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontFamily: fonts.semibold, fontSize: 16 },
            title: "",
            contentStyle: { backgroundColor: colors.canvas },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Inscription" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
