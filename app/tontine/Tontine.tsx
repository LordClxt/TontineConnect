import { View, Text } from "react-native";
import React from "react";

interface TontineInterface {
  nom: string;
  participans: number;
  date: string;
  montant: string;
}

const Tontine: React.FC<TontineInterface> = ({
  nom,
  participans,
  date,
  montant,
}) => {
  return (
    <View
      style={{ padding: 15, elevation:2 }}
      className="bg-white border border-gray-200  rounded flex-row items-center my-1"
    >
      <View style={{ flex: 3 }}>
        <Text className="font-bold">{nom}</Text>
        <Text className="font-bold">{participans} participans</Text>
        <Text className="font-bold">Date de debut: {date}</Text>
        <Text className="font-bold">Montant: {montant} FCFA</Text>
      </View>
      <View className="flex-1">
        <View className="bg-green-300 py-2 rounded-full">
            <Text className="text-center font-bold text-green-950">En attente</Text>
        </View>
      </View>
    </View>
  );
};

export default Tontine;
