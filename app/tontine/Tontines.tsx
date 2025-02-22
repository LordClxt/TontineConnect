import { View, Text, FlatList } from "react-native";
import React from "react";
import { TONTINES } from "@/data/DB";
import Tontine from "./Tontine";
import store from "@/store";
interface TontineInterface{
  id:number
  nom_tontine:string;
  time_stamp_date_debut:string;
  montant:string;
  nombre_membre_max:number,
  membres:string[]
}

interface TontinesProps {
  tontines: TontineInterface []; // Remplacer 'any' par le type approprié
  currentUser:string
}

const Tontines = ({ tontines, currentUser }: TontinesProps) => {
  const user = store(state=>state.user)
  return (
    <>
      {
        tontines.length > 0 ?
        <FlatList
          data={tontines}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Tontine
                    isMember={item.membres.includes(currentUser)}
                    id={item.id}
                    nom={item.nom_tontine} 
                    date={item.time_stamp_date_debut} 
                    montant={item.montant}
                    participans={item.nombre_membre_max}
                    />;
          }}
        />:<View>
          <Text className="text-center my-5 font-bold text-xl">Aucune tontine disponible</Text>
        </View>
      }
    </>
  );
};

export default Tontines;
