import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Tontine from "./Tontine";
import T from "@/components/ui/T";
import { colors } from "@/constants/theme";

export interface TontineData {
  id: number;
  nom_tontine: string;
  time_stamp_date_debut: string;
  montant: string;
  nombre_membre_max: number;
  membres: string[];
}

interface TontinesProps {
  tontines: TontineData[];
  currentUser: string;
  emptyMessage: string;
}

const Tontines = ({ tontines, currentUser, emptyMessage }: TontinesProps) => {
  if (tontines.length === 0) {
    return (
      <View className="items-center py-12 gap-3">
        <View className="w-14 h-14 rounded-full bg-tint items-center justify-center">
          <Ionicons name="people-outline" size={24} color={colors.brandDeep} />
        </View>
        <T variant="body" className="text-muted text-center">
          {emptyMessage}
        </T>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl px-4 border border-line">
      {tontines.map((item, i) => (
        <View key={item.id} className={i > 0 ? "border-t border-line" : undefined}>
          <Tontine
            isMember={item.membres.includes(currentUser)}
            id={item.id}
            nom={item.nom_tontine}
            date={item.time_stamp_date_debut}
            montant={item.montant}
            membres={item.membres.length}
            maxMembres={item.nombre_membre_max}
          />
        </View>
      ))}
    </View>
  );
};

export default Tontines;
