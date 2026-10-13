import { View, Pressable } from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Amount from "@/components/ui/Amount";
import T from "@/components/ui/T";
import TontineRing from "./TontineRing";
import { SERVER_IP } from "@/constants/server_ip";
import { colors } from "@/constants/theme";
import store from "@/store";

interface TontineInterface {
  id: number;
  nom: string;
  membres: number;
  maxMembres: number;
  date: string;
  montant: string;
  isMember: boolean;
}

const Tontine: React.FC<TontineInterface> = ({ nom, membres, maxMembres, date, montant, id, isMember }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = store((state) => state.token);

  const mutationJoin = useMutation({
    mutationFn: () =>
      axios.get(`http://${SERVER_IP}:8000/blockchain/tontine/rejoindre/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tontines"] });
    },
    onError: () => {
      console.log("Une erreur c'est produite");
    },
  });

  return (
    <Pressable
      disabled={!isMember}
      onPress={() => router.push(`/tontine/${id}`)}
      className="flex-row items-center gap-4 py-4"
    >
      <TontineRing total={maxMembres} filled={membres} size={56}>
        <T variant="caption" className="font-sora-semibold text-brand-deep">
          {membres}/{maxMembres}
        </T>
      </TontineRing>
      <View className="flex-1 gap-0.5">
        <T variant="heading" numberOfLines={1}>
          {nom}
        </T>
        <View className="flex-row items-baseline gap-1">
          <Amount value={montant} size="sm" className="text-brand-deep" />
          <T variant="caption" className="text-muted">
            par tour
          </T>
        </View>
        <T variant="caption" className="text-muted">
          Début le {date}
        </T>
      </View>
      {isMember ? (
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      ) : (
        <PrimaryButton size="sm" className="" loading={mutationJoin.isPending} onPress={() => mutationJoin.mutate()}>
          Rejoindre
        </PrimaryButton>
      )}
    </Pressable>
  );
};

export default Tontine;
