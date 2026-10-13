import React from "react";
import { Redirect, Tabs } from "expo-router";
import { ColorValue } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import store from "@/store";
import { colors, fonts } from "@/constants/theme";

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon =
  (active: IconName, inactive: IconName) =>
  ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} color={color as string} size={23} />
  );

const _layout = () => {
  const token = store((state) => state.token);
  if (!token) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandDeep,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.line,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Accueil", tabBarIcon: tabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="epargne"
        options={{ title: "Épargne", tabBarIcon: tabIcon("wallet", "wallet-outline") }}
      />
      <Tabs.Screen
        name="mon_ia/index"
        options={{ title: "Mon IA", tabBarIcon: tabIcon("sparkles", "sparkles-outline") }}
      />
    </Tabs>
  );
};

export default _layout;
