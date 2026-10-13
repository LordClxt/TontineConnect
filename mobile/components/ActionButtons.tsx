import { View } from "react-native";
import React from "react";
import ActionButton from "./ui/ActionButton";
import { useRouter } from "expo-router";

const ActionButtons = () => {
  const router = useRouter();
  return (
    <View className="mx-6 flex-row gap-3">
      <ActionButton
        name="add-circle-outline"
        description="Lancer un nouveau cercle"
        onPress={() => router.push("/tontine/CreeTontine")}
      >
        Créer
      </ActionButton>
      <ActionButton
        name="people-outline"
        description="Suivre ou rejoindre"
        onPress={() => router.push("/tontine/AllTontine")}
      >
        Mes tontines
      </ActionButton>
    </View>
  );
};

export default ActionButtons;
