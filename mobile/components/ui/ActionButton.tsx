import { View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import T from "./T";
import { colors } from "@/constants/theme";

interface ActionButtonProps {
  children: string;
  description: string;
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, description, name, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-1 bg-white border border-line rounded-3xl p-4 gap-3"
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <View className="w-11 h-11 rounded-2xl bg-tint items-center justify-center">
        <Ionicons name={name} size={22} color={colors.brandDeep} />
      </View>
      <View className="gap-0.5">
        <T variant="heading">{children}</T>
        <T variant="caption" className="text-muted">
          {description}
        </T>
      </View>
    </Pressable>
  );
};

export default ActionButton;
