import { View, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SimpleHeader from "@/components/SimpleHeader";
import Segmented from "@/components/ui/Segmented";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Tontines, { TontineData } from "@/components/tontine/Tontines";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { SERVER_IP } from "@/constants/server_ip";
import store from "@/store";

type Filter = "mine" | "others";

const AllTontine = () => {
  const token = store((state) => state.token);
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("mine");

  const { data, isLoading } = useQuery<{ tontines: TontineData[]; current_user: string }>({
    queryKey: ["tontines"],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/tontines`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  const visible = useMemo(() => {
    if (!data) return [];
    const isMine = (t: TontineData) => t.membres.includes(data.current_user);
    return data.tontines.filter((t) => (filter === "mine" ? isMine(t) : !isMine(t)));
  }, [data, filter]);

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <ScrollView className="bg-canvas" showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
        <SimpleHeader subtitle="Chaque cercle rassemble des membres qui cotisent à tour de rôle.">
          Tontines
        </SimpleHeader>
        <View className="mx-6 mt-6 gap-5">
          <Segmented
            options={[
              { key: "mine", label: "Mes tontines" },
              { key: "others", label: "À rejoindre" },
            ]}
            value={filter}
            onChange={setFilter}
          />
          {isLoading || !data ? (
            <LoadingOverlay />
          ) : (
            <Tontines
              currentUser={data.current_user}
              tontines={visible}
              emptyMessage={
                filter === "mine"
                  ? "Vous ne participez à aucune tontine pour l'instant."
                  : "Aucune autre tontine ouverte en ce moment."
              }
            />
          )}
          <PrimaryButton variant="outline" className="w-full" onPress={() => router.push("/tontine/CreeTontine")}>
            Créer une tontine
          </PrimaryButton>
        </View>
      </ScrollView>
    </>
  );
};

export default AllTontine;
