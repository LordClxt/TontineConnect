import { View, Text } from "react-native";
import React from "react";
import ActionButton from "./ui/ActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ActionButtons = () => {
  const router = useRouter();
  return (
    <View className="mt-20 mx-7 flex-row gap-2">
      <ActionButton color="#6d28d9" name="add" onPress={() => router.push("/tontine/CreeTontine")}>
        Crée tontine
      </ActionButton>
      <ActionButton onPress={()=>router.push("/tontine/AllTontine")} color="#6d28d9" name="cash-outline">
        Tontines
      </ActionButton>
      {/* <ActionButton color="#6d28d9" name="walk-outline">
        Adhérer tontine
      </ActionButton> */}
    </View>
  );
};

export default ActionButtons;
