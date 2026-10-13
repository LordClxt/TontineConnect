import { ActivityIndicator, Pressable, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "./ui/PrimaryButton";
import Amount from "./ui/Amount";
import T from "./ui/T";
import { useSheets } from "@/context/sheets";
import { useAccount } from "@/api/account";
import { colors } from "@/constants/theme";

const HeaderEpargne = () => {
  const { data, isLoading } = useAccount();
  const { openRecharger, openRetirer } = useSheets();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-brand px-6 pb-7 rounded-b-[32px] gap-5" style={{ paddingTop: insets.top + 20 }}>
      <View className="gap-1">
        <T variant="label" className="text-white/70">
          Compte épargne
        </T>
        {isLoading ? (
          <ActivityIndicator color={colors.white} className="self-start h-[46px]" />
        ) : (
          <Amount value={data?.compte_epargne} size="xl" className="text-white" />
        )}
      </View>
      <View className="flex-row gap-3">
        <PrimaryButton variant="onDark" onPress={openRecharger}>
          Épargner
        </PrimaryButton>
        <PrimaryButton variant="ghostOnDark" onPress={openRetirer}>
          Retirer
        </PrimaryButton>
      </View>
      <Pressable
        onPress={() => router.push("/epargne/AllCourses")}
        className="flex-row items-center gap-3 bg-white/10 rounded-2xl p-4"
      >
        <Ionicons name="play-circle" size={28} color={colors.white} />
        <View className="flex-1">
          <T variant="label" className="text-white">
            Cours sur l'épargne
          </T>
          <T variant="caption" className="text-white/70">
            Courtes vidéos pour mieux gérer votre argent
          </T>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default HeaderEpargne;
