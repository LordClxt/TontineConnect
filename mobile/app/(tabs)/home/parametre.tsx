import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import T from "@/components/ui/T";
import { colors } from "@/constants/theme";

const parametre = () => {
  return (
    <View className="flex-1 bg-canvas items-center justify-center px-10 gap-3">
      <View className="w-14 h-14 rounded-full bg-tint items-center justify-center">
        <Ionicons name="settings-outline" size={24} color={colors.brandDeep} />
      </View>
      <T variant="heading">Paramètres</T>
      <T variant="body" className="text-muted text-center">
        Les réglages du compte et des notifications arrivent bientôt.
      </T>
    </View>
  );
};

export default parametre;
