import { View } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import TransactionItem from "./TransactionItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import T from "./T";
import store from "@/store";
import { SERVER_IP } from "@/constants/server_ip";
import { colors } from "@/constants/theme";

interface Transaction {
  id: number;
  nom: string;
  date: string;
  montant: string;
  tontine_id?: number;
}

const TransactionItems = ({
  limit,
  isEpargne,
  tontineTransactions,
  tontineId,
}: {
  limit?: number;
  isEpargne?: boolean;
  tontineTransactions?: Transaction[];
  tontineId?: number;
}) => {
  const token = store((state) => state.token);

  const { data, isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/transactions/user`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => res.data),
    enabled: !tontineTransactions,
  });

  const transactions = useMemo(() => {
    let list: Transaction[];
    if (tontineTransactions) {
      list = tontineTransactions.filter(
        (transaction) => transaction.nom.includes("Contribution") && transaction.tontine_id == tontineId
      );
    } else if (isEpargne) {
      list = (data ?? []).filter((transaction) => transaction.nom.includes("epargne"));
    } else {
      list = data ?? [];
    }
    // Plus récentes d'abord (copie : ne pas muter le cache react-query)
    const recent = [...list].reverse();
    return limit ? recent.slice(0, limit) : recent;
  }, [data, tontineTransactions, tontineId, isEpargne, limit]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (transactions.length === 0) {
    return (
      <View className="mx-6 items-center py-10 gap-3">
        <View className="w-14 h-14 rounded-full bg-tint items-center justify-center">
          <Ionicons name="receipt-outline" size={24} color={colors.brandDeep} />
        </View>
        <T variant="heading">Aucune transaction</T>
        <T variant="body" className="text-muted text-center">
          Vos recharges, retraits et contributions apparaîtront ici.
        </T>
      </View>
    );
  }

  return (
    <View className="mx-6 bg-white rounded-3xl px-4 border border-line">
      {transactions.map((transaction, i) => (
        <View key={transaction.id} className={i > 0 ? "border-t border-line" : undefined}>
          <TransactionItem date={transaction.date} nom={transaction.nom} montant={transaction.montant} />
        </View>
      ))}
    </View>
  );
};
export default TransactionItems;
