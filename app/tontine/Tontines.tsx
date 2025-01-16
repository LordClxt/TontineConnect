import { View, Text, FlatList } from "react-native";
import React from "react";
import { TONTINES } from "@/data/DB";
import Tontine from "./Tontine";

const Tontines = () => {
  return (
    <FlatList
      data={TONTINES}
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return <Tontine nom={item.nom} 
                date={item.date_debut} 
                montant={item.montant}
                participans={item.participants}
                />;
      }}
    />
  );
};

export default Tontines;
