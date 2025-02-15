import { Text, View } from "react-native";
import React, { Component, useContext } from "react";
import PrimaryButton from "./ui/PrimaryButton";
import { BottomSheetContext } from "@/app/(tabs)/home";
import store from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingOverlay from "./ui/LoadingOverlay";

export const CardSold = () => {
  const token = store((state) => state.token);

  const {data, isLoading} = useQuery({
    queryKey:['account_blockchain'],
    queryFn:()=>axios.get(
      `http://192.168.1.4:8000/blockchain/compte_utilisateur`,{
        headers:{
          'Authorization':`bearer ${token}`
        }
      }
    ).then(res=>res.data),
  });
  if(isLoading){
    return <LoadingOverlay />
  }
  
  // @ts-ignore
  const { openRecharger, openRetirer } = useContext(BottomSheetContext);
  return (
    <View
      style={{ elevation: 5 }}
      className="absolute gap-2 -bottom-[53px] rounded-xl w-full p-5 bg-white "
    >
      <Text className="font-bold text-xl">TON SOLDE</Text>
      <Text className="font-bold text-3xl text-violet-600">
        {data?.compte_principale} FCFA
      </Text>
      <View className="flex-row gap-1">
        <PrimaryButton onPress={openRecharger}>RECHARGER</PrimaryButton>
        <PrimaryButton onPress={openRetirer}>RETIRER</PrimaryButton>
      </View>
    </View>
  );
};

export default CardSold;
