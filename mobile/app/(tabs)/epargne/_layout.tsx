import React from "react";
import { Stack } from "expo-router";
import { colors, fonts } from "@/constants/theme";

const _layout = () => {
  return (
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
    </Stack>
  );
};

export default _layout;
