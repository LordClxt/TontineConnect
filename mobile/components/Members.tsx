import React from "react";
import { View } from "react-native";
import T from "./ui/T";

interface Membre {
  id: number;
  nom: string;
  prenom: string;
}

const Members = ({ membres, emptyMessage }: { membres: Membre[]; emptyMessage: string }) => {
  if (!membres || membres.length === 0) {
    return (
      <T variant="body" className="text-muted text-center py-10 mx-6">
        {emptyMessage}
      </T>
    );
  }
  return (
    <View className="mx-6 bg-white rounded-3xl px-4 border border-line">
      {membres.map((item, i) => (
        <View key={item.id} className={`flex-row items-center gap-3 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
          <View className="w-10 h-10 rounded-full bg-tint items-center justify-center">
            <T variant="label" className="text-brand-deep">
              {`${item.prenom?.[0] ?? ""}${item.nom?.[0] ?? ""}`.toUpperCase()}
            </T>
          </View>
          <T variant="label">
            {item.prenom} {item.nom}
          </T>
        </View>
      ))}
    </View>
  );
};

export default Members;
