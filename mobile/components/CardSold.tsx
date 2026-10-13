import { ActivityIndicator, View } from "react-native";
import React from "react";
import PrimaryButton from "./ui/PrimaryButton";
import Amount from "./ui/Amount";
import T from "./ui/T";
import { useSheets } from "@/context/sheets";
import { useAccount } from "@/api/account";
import { colors } from "@/constants/theme";

export const CardSold = () => {
  const { data, isLoading } = useAccount();
  const { openRecharger, openRetirer } = useSheets();

  return (
    <View className="gap-5">
      <View className="gap-1">
        <T variant="label" className="text-white/70">
          Solde principal
        </T>
        {isLoading ? (
          <ActivityIndicator color={colors.white} className="self-start h-[46px]" />
        ) : (
          <Amount value={data?.compte_principale} size="xl" className="text-white" />
        )}
      </View>
      <View className="flex-row gap-3">
        <PrimaryButton variant="onDark" onPress={openRecharger}>
          Recharger
        </PrimaryButton>
        <PrimaryButton variant="ghostOnDark" onPress={openRetirer}>
          Retirer
        </PrimaryButton>
      </View>
    </View>
  );
};

export default CardSold;
