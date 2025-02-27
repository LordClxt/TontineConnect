import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import store from "@/store";
import { SERVER_IP } from "@/app/constant/server_ip";

const TransactionItems = ({
  limit,
  isEpargne,
  tontineTransactions,
  tontineId,
}: {
  limit?: number;
  isEpargne?: boolean;
  tontineTransactions?: [];
  tontineId?: number;
}) => {
  const token = store((state) => state.token);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/transactions/user`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (tontineTransactions) {
      setTransactions(
        tontineTransactions.filter((transaction: { nom: string; tontine_id: number }) =>
          transaction.nom.includes("Contribution") && transaction.tontine_id == tontineId
        )
      );
    } else if (isSuccess && isEpargne) {
      setTransactions(
        data.filter((transaction: { nom: string }) =>
          transaction.nom.includes("epargne")
        )
      );
    } else {
      setTransactions(data);
    }
  }, [isSuccess, data]);
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View className="mx-7">
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <View className=" gap-2">
          {
            // @ts-ignore
            transactions?.length <= 0 ? (
              <Text className="text-center my-5 font-bold">
                Aucune transaction disponible
              </Text>
            ) : (
              transactions
                ?.reverse()
                .slice(0, limit ? limit : data.length)
                ?.map(
                  (transaction: {
                    id: number;
                    nom: string;
                    date: string;
                    montant: string;
                  }) => {
                    return (
                      <TransactionItem
                        key={transaction.id}
                        date={transaction.date}
                        nom={transaction.nom}
                        montant={transaction.montant}
                      />
                    );
                  }
                )
            )
          }
        </View>
      )}
    </View>
  );
};
export default TransactionItems;
