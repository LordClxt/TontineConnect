import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_IP } from "../constant/server_ip";
import store from "@/store";
import { useRouter } from "expo-router";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface TontineInterface {
  id: number;
  nom: string;
  participans: number;
  date: string;
  montant: string;
  isMember: boolean;
}

const Tontine: React.FC<TontineInterface> = ({
  nom,
  participans,
  date,
  montant,
  id,
  isMember,
}) => {
  const router = useRouter()
  const token = store((state) => state.token);

  const mutationJoin = useMutation({
    mutationFn: () =>
      axios.get(
        `http://${SERVER_IP}:8000/blockchain/tontine/rejoindre/${id}`,{
          headers:{
            'Authorization':`bearer ${token}`
          }}),
    onSuccess: () => {
      router.push('/tontine/AllTontine')
    },
    onError: () => {
      console.log("Une erreur c'est produite");
    },
  });

  const handleJoin = ()=>{
    mutationJoin.mutate()
  }

  return (
    <>
    
      <View
        style={{ padding: 15, elevation: 2 }}
        className="bg-white border border-gray-200  rounded flex-row items-center my-1"
      >
        <View style={{ flex: 3 }}>
          <Text className="font-bold">{nom}</Text>
          <Text className="font-bold">{participans} participans</Text>
          <Text className="font-bold">Date de debut: {date}</Text>
          <Text className="font-bold">Montant: {montant} FCFA</Text>
        </View>
        <View className="flex-1">
          {isMember ? (
            <Button  className="bg-violet-500 text-xl" onPress={() =>router.push(`/tontine/${id}`)}>
              Voir
            </Button>
          ) : (
            <Button className="bg-violet-500 text-xl" onPress={handleJoin}>
              {
                mutationJoin.isPending ? 'Chargement': 'Rejoindre'
              }
            </Button>
          )}
        </View>
      </View>
    </>
  );
};

export default Tontine;
