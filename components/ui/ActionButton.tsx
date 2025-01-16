import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonProps {
  children: string;
  name?: string;
  color: string;
  onPress?:()=>void
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  name,
  color,
  onPress
}) => {
  return (
    <View
      className=" border-2 border-violet-600 justify-center 
      items-center bg-violet-200 flex-1 rounded"
    >
      <Pressable onPress={onPress} className="py-5 w-full items-center">
        <View className="items-center">
          <Ionicons
            name={name as keyof typeof Ionicons.glyphMap}
            size={54}
            color={color}
          />
        </View>
        <View>
          <Text className="text-violet-700  font-bold">{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ActionButton;
