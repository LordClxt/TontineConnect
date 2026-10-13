import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import T from "./ui/T";
import { colors } from "@/constants/theme";

interface LineInfoProfileProps {
  icon: keyof typeof Ionicons.glyphMap;
  left: string;
  right?: string;
  last?: boolean;
}

const LineInfoProfile = ({ icon, left, right, last }: LineInfoProfileProps) => {
  return (
    <View className={`flex-row items-center gap-3 py-4 ${last ? "" : "border-b border-line"}`}>
      <Ionicons name={icon} size={20} color={colors.brandDeep} />
      <View className="flex-1 gap-0.5">
        <T variant="caption" className="text-muted">
          {left}
        </T>
        <T variant="label">{right || "Non renseigné"}</T>
      </View>
    </View>
  );
};

export default LineInfoProfile;
