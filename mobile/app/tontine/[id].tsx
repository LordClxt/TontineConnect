import store from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import axios from "axios";
import { SERVER_IP } from "@/constants/server_ip";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Segmented from "@/components/ui/Segmented";
import Amount from "@/components/ui/Amount";
import T from "@/components/ui/T";
import Members from "@/components/Members";
import TransactionItems from "@/components/ui/TransactionItems";
import TontineRing from "@/components/tontine/TontineRing";

type Tab = "participants" | "transactions" | "contributeurs";

const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View className="flex-1 gap-0.5">
    <T variant="caption" className="text-white/70">
      {label}
    </T>
    <T variant="label" className="text-white">
      {value}
    </T>
  </View>
);

const TontinePage = () => {
  const { id } = useLocalSearchParams();
  const token = store((state) => state.token);
  const auth = { headers: { Authorization: `bearer ${token}` } };

  const { data, isLoading } = useQuery({
    queryKey: ["tontine", id],
    queryFn: () => axios.get(`http://${SERVER_IP}:8000/blockchain/tontine/${id}`, auth).then((res) => res.data),
  });

  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(`http://${SERVER_IP}:8000/user`).then((res) => res.data),
  });

  const { data: membres, isLoading: membresLoading } = useQuery({
    queryKey: ["user", "tontine", id],
    queryFn: () => axios.get(`http://${SERVER_IP}:8000/blockchain/users/tontine/${id}`, auth).then((res) => res.data),
  });

  const { data: transactions, isLoading: transactionLoading } = useQuery({
    queryKey: ["tontine_transactions", +id],
    queryFn: () =>
      axios.get(`http://${SERVER_IP}:8000/blockchain/transactions/tontines/${id}`, auth).then((res) => res.data),
  });

  // Alerte pour validation de la contribution
  const handleContribuate = () => {
    Alert.alert("Confirmer la contribution", `Vous allez verser ${data.montant} FCFA dans cette tontine.`, [
      { text: "Annuler", style: "cancel" },
      { text: "Contribuer", style: "default" },
    ]);
  };

  const [select, setSelect] = useState<Tab>("participants");

  if (isLoading || membresLoading || transactionLoading || userLoading) {
    return <LoadingOverlay />;
  }

  // Même source que la liste des tontines (adresses des membres on-chain)
  const memberCount = data.membres?.length ?? membres?.length ?? 0;

  let BottomComponenet;
  if (select == "participants") {
    BottomComponenet = <Members membres={membres} emptyMessage="Aucun participant pour l'instant." />;
  } else if (select == "transactions") {
    BottomComponenet = <TransactionItems tontineId={+id} tontineTransactions={transactions} />;
  } else {
    BottomComponenet = (
      <Members
        membres={users.filter((user: { address: string }) => data.contributeurs.includes(user.address))}
        emptyMessage="Personne n'a encore contribué à ce tour."
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: data.nom_tontine }} />
      <ScrollView className="bg-canvas" contentContainerClassName="pb-12" showsVerticalScrollIndicator={false}>
        <View className="bg-brand px-6 pb-7 rounded-b-[32px] items-center">
          <TontineRing total={data.nombre_membre_max} filled={memberCount} size={208} tone="onDark">
            <View className="items-center">
              <Amount value={data.montant} size="lg" className="text-white" />
              <T variant="caption" className="text-white/70">
                par tour
              </T>
            </View>
          </TontineRing>
          <T variant="label" className="text-white/80 mt-3">
            {memberCount} membres sur {data.nombre_membre_max}
          </T>

          <View className="flex-row w-full mt-6 gap-4">
            <Fact label="Début" value={data.time_stamp_date_debut} />
            <Fact label="Prochaine distribution" value={data.prochaine_distribution ?? "À définir"} />
          </View>

          <View className="flex-row w-full gap-3 mt-6">
            <PrimaryButton variant="onDark" onPress={handleContribuate}>
              Contribuer
            </PrimaryButton>
            <PrimaryButton variant="ghostOnDark" onPress={() => {}}>
              Retirer
            </PrimaryButton>
          </View>
        </View>

        <Segmented
          className="mx-6 mt-6 mb-5"
          options={[
            { key: "participants", label: "Membres" },
            { key: "transactions", label: "Transactions" },
            { key: "contributeurs", label: "Ont payé" },
          ]}
          value={select}
          onChange={setSelect}
        />
        {BottomComponenet}
      </ScrollView>
    </>
  );
};

export default TontinePage;
