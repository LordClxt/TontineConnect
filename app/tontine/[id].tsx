import store from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SERVER_IP } from "../constant/server_ip";
import axios from "axios";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Button from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import Members from "@/components/Members";
import TransactionItems from "@/components/ui/TransactionItems";

const TontinePage = () => {
  const { id } = useLocalSearchParams();
  const token = store((state) => state.token);
  const user = store((state) => state.user);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["tontine", id],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/tontine/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/user`)
        .then((res) => res.data),
  });

  const { data: membres, isLoading: membresLoading } = useQuery({
    queryKey: ["user", "tontine", id],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/users/tontine/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  const { data: transactions, isLoading: transactionLoading } = useQuery({
    queryKey: ["tontine_transactions", +id],
    queryFn: () =>
      axios
        .get(
          `http://${SERVER_IP}:8000/blockchain/transactions/tontines/${id}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        )
        .then((res) => res.data),
  });

  // Alerte pour validation de la contribution
  const handleContribuate = () => {
    Alert.alert("Confirmer la contribution", "Voulez vraiment continuez?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "confirmer",
        style: "default",
      },
    ]);
  };

  const [select, setSelect] = useState("participants");

  if (isLoading || membresLoading || transactionLoading || userLoading) {
    return <LoadingOverlay />;
  }

  let BottomComponenet;
  if (select == "participants") {
    BottomComponenet = <Members membres={membres} />;
  } else if (select == "transactions") {
    BottomComponenet = (
      <TransactionItems tontineId={+id} tontineTransactions={transactions} />
    );
  } else {
    BottomComponenet = (
      <Members membres={users.filter((user: { address: string }) => data.contributeurs.includes(user.address))} />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: data.nom_tontine,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          statusBarStyle: "dark",
        }}
      />
      <ScrollView className="bg-white">
        <View>
          <View className="bg-violet-600 pb-10">
            <View className="mt-[4.5rem] gap-6 mx-5">
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-lg text-white"
              >
                MONTANT: {data.montant} FCFA
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-lg text-white"
              >
                DATE DE DEBUT: {data.time_stamp_date_debut}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-lg text-white"
              >
                PARTICIPANTS MAX: {data.nombre_membre_max}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-lg text-white"
              >
                BENEFICIER:
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-lg text-white"
              >
                PROCHAINE DISTRIBUTION: {data.prochaine_distribution}
              </Text>
              <View className="flex-row gap-2">
                <Button
                  className="border flex-1 border-white"
                  onPress={() => handleContribuate()}
                >
                  Contribuer
                </Button>
                <Button
                  className="border flex-1 border-white"
                  onPress={() => {}}
                >
                  Retirer
                </Button>
              </View>
            </View>
          </View>
          <View>
            <View className="flex-row mb-5">
              <Status
                isSelected={select == "participants"}
                text="Participants"
                onPress={() => setSelect("participants")}
              />
              <Status
                isSelected={select == "transactions"}
                text="Transactions"
                onPress={() => setSelect("transactions")}
              />
              <Status
                isSelected={select == "contributeurs"}
                text="Contributeurs"
                onPress={() => setSelect("contributeurs")}
              />
            </View>
            {BottomComponenet}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TontinePage;
