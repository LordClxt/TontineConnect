import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import T from "./T";
import Amount from "./Amount";
import { colors } from "@/constants/theme";

interface TransactionInterface {
  nom: string;
  montant: string;
  date: string;
}

// L'API ne renvoie pas de type de mouvement : on le déduit du libellé
const iconFor = (nom: string): keyof typeof Ionicons.glyphMap => {
  const n = nom.toLowerCase();
  if (n.includes("retrait")) return "arrow-up";
  if (n.includes("contribution")) return "people";
  if (n.includes("epargne") || n.includes("épargne")) return "leaf";
  if (n.includes("distribution")) return "gift";
  return "arrow-down";
};

const TransactionItem = ({ nom, montant, date }: TransactionInterface) => {
  return (
    <View className="flex-row items-center gap-3 py-3.5">
      <View className="w-11 h-11 rounded-full bg-tint items-center justify-center">
        <Ionicons name={iconFor(nom)} size={18} color={colors.brandDeep} />
      </View>
      <View className="flex-1 gap-0.5">
        <T variant="label" className="text-ink" numberOfLines={1}>
          {nom}
        </T>
        <T variant="caption" className="text-muted">
          {date}
        </T>
      </View>
      <Amount value={montant} size="sm" />
    </View>
  );
};

export default TransactionItem;
