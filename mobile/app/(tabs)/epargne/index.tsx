import { View, ScrollView } from "react-native";
import React, { useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import HeaderEpargne from "@/components/HeaderEpargne";
import TransactionItems from "@/components/ui/TransactionItems";
import AmountSheet, { AmountSheetValues } from "@/components/AmountSheet";
import T from "@/components/ui/T";
import store from "@/store";
import { SheetsContext } from "@/context/sheets";
import { SERVER_IP } from "@/constants/server_ip";

const index = () => {
  const queryClient = useQueryClient();
  const token = store((state) => state.token);

  const rechargerRef = useRef<BottomSheet>(null);
  const retirerRef = useRef<BottomSheet>(null);

  const sheets = useMemo(
    () => ({
      openRecharger: () => rechargerRef.current?.expand(),
      openRetirer: () => retirerRef.current?.expand(),
    }),
    []
  );

  const rechargerMutation = useMutation({
    mutationFn: (data: AmountSheetValues) =>
      axios.post(`http://${SERVER_IP}:8000/blockchain/rechargeEpargneAccount`, data, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account_blockchain"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      rechargerRef.current?.close();
    },
  });

  return (
    <SheetsContext.Provider value={sheets}>
      <View className="flex-1 bg-canvas">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
          <HeaderEpargne />
          <T variant="heading" className="mx-6 mt-7 mb-3">
            Mouvements d'épargne
          </T>
          <TransactionItems isEpargne />
        </ScrollView>

        <AmountSheet
          ref={retirerRef}
          title="Retirer de l'épargne"
          description="Le montant repasse sur votre compte Mobile Money."
          submitLabel="Retirer"
          onSubmit={() => retirerRef.current?.close()}
          onClose={() => retirerRef.current?.close()}
        />
        <AmountSheet
          ref={rechargerRef}
          title="Épargner"
          description="Mettez de côté une somme sur votre compte épargne."
          submitLabel="Épargner"
          loading={rechargerMutation.isPending}
          onSubmit={(values) => rechargerMutation.mutate(values)}
          onClose={() => rechargerRef.current?.close()}
        />
      </View>
    </SheetsContext.Provider>
  );
};

export default index;
