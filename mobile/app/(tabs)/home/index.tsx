import { View, ScrollView, Pressable } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import TransactionItems from "@/components/ui/TransactionItems";
import AmountSheet, { AmountSheetValues } from "@/components/AmountSheet";
import ModalSucces from "@/components/ModalSuccesTransaction";
import T from "@/components/ui/T";
import store from "@/store";
import { SheetsContext } from "@/context/sheets";
import { SERVER_IP } from "@/constants/server_ip";

const index = () => {
  const queryClient = useQueryClient();
  const token = store((state) => state.token);
  const router = useRouter();

  const rechargerRef = useRef<BottomSheet>(null);
  const retirerRef = useRef<BottomSheet>(null);
  const [isModal, setIsModal] = useState(false);

  const sheets = useMemo(
    () => ({
      openRecharger: () => rechargerRef.current?.expand(),
      openRetirer: () => retirerRef.current?.expand(),
    }),
    []
  );

  const rechargerMutation = useMutation({
    mutationFn: (data: AmountSheetValues) =>
      axios.post(`http://${SERVER_IP}:8000/blockchain/rechargeAccount`, data, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      setIsModal(true);
      queryClient.invalidateQueries({ queryKey: ["account_blockchain"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setTimeout(() => {
        setIsModal(false);
        rechargerRef.current?.close();
      }, 1500);
    },
  });

  return (
    <SheetsContext.Provider value={sheets}>
      <View className="flex-1 bg-canvas">
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
          <ModalSucces message="Recharge effectuée" isVisible={isModal} />
          <Header />

          <T variant="heading" className="mx-6 mt-7 mb-3">
            Tontines
          </T>
          <ActionButtons />

          <View className="mx-6 mt-8 mb-3 flex-row items-center justify-between">
            <T variant="heading">Transactions récentes</T>
            <Pressable onPress={() => router.push("/transaction")} hitSlop={10}>
              <T variant="label" className="text-brand-deep">
                Tout voir
              </T>
            </Pressable>
          </View>
          <TransactionItems limit={3} />
        </ScrollView>

        <AmountSheet
          ref={retirerRef}
          title="Retirer"
          description="L'argent est envoyé sur votre compte Mobile Money."
          submitLabel="Retirer"
          onSubmit={() => retirerRef.current?.close()}
          onClose={() => retirerRef.current?.close()}
        />
        <AmountSheet
          ref={rechargerRef}
          title="Recharger"
          description="Alimentez votre solde principal depuis Mobile Money."
          submitLabel="Recharger"
          loading={rechargerMutation.isPending}
          onSubmit={(values) => rechargerMutation.mutate(values)}
          onClose={() => rechargerRef.current?.close()}
        />
      </View>
    </SheetsContext.Provider>
  );
};

export default index;
