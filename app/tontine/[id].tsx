import store from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SERVER_IP } from "../constant/server_ip";
import axios from "axios";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Button from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import Members from "@/components/Members";

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

  const [select, setSelect] = useState("participants");

  if (isLoading || membresLoading) {
    return <LoadingOverlay />;
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
          statusBarStyle:'dark'
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
                  onPress={() => {}}
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
            <View className="flex-row ">
              <Status
                isSelected={select == "participants"}
                text="Participants"
              />
              <Status
                isSelected={select == "transactions"}
                text="Transactions"
              />
            </View>
            <Members membres={membres} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TontinePage;
