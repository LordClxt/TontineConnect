import { View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";

const LoadingOverlay = () => {
  return (
    <View className="flex-1 items-center justify-center py-16">
      <ActivityIndicator size="large" color={colors.brand} />
    </View>
  );
};

export default LoadingOverlay;
