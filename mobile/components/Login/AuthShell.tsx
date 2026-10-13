import { View, ScrollView, KeyboardAvoidingView, Platform, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import T from "../ui/T";
import TontineRing from "../tontine/TontineRing";
import { colors } from "@/constants/theme";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const socials = [
  { label: "Facebook", source: require("@/assets/images/5D8s-GsHJlJ.png") },
  { label: "Apple", source: require("@/assets/images/apple.png") },
  { label: "Google", source: require("@/assets/images/channels4_profile.jpg") },
];

// Cadre commun connexion / inscription
const AuthShell: React.FC<AuthShellProps> = ({ title, subtitle, children, footer }) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView className="flex-1 bg-brand" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={[colors.brandLight, colors.brand]} style={{ paddingTop: insets.top + 28 }}>
          <View className="px-6 pb-14 flex-row items-center gap-4">
            <TontineRing total={8} filled={5} size={64} tone="onDark" />
            <View className="flex-1">
              <T variant="title" className="text-white">
                TontineConnect
              </T>
              <T variant="body" className="text-white/80">
                L'épargne en groupe, tracée sur la blockchain.
              </T>
            </View>
          </View>
        </LinearGradient>

        <View className="flex-1 bg-canvas rounded-t-[32px] -mt-6 px-6 pt-8" style={{ paddingBottom: insets.bottom + 24 }}>
          <T variant="title">{title}</T>
          <T variant="body" className="text-muted mt-1 mb-4">
            {subtitle}
          </T>

          {children}

          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-line" />
            <T variant="caption" className="text-muted">
              ou continuer avec
            </T>
            <View className="flex-1 h-px bg-line" />
          </View>
          <View className="flex-row gap-3">
            {socials.map((social) => (
              <Pressable
                key={social.label}
                accessibilityLabel={social.label}
                className="flex-1 h-14 items-center justify-center bg-white border border-line rounded-2xl"
              >
                <Image className="w-7 h-7" resizeMode="contain" source={social.source} />
              </Pressable>
            ))}
          </View>

          <View className="mt-auto pt-8 items-center">{footer}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthShell;
