import { View, Text, ScrollView } from "react-native";
import React, { createContext, useRef } from "react";
import { Stack } from "expo-router";
import HeaderEpargne from "@/components/HeaderEpargne";
import TransactionItems from "@/components/ui/TransactionItems";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Entypo } from "@expo/vector-icons";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';  
export const BottomSheetRechargerContext = createContext(null)

const index = () => {
  const recharcherRef = useRef<BottomSheet>(null);
  const retirerrRef = useRef<BottomSheet>(null);
  const snapPoints = ["48%"];
  const closeRecharger = () => {
    recharcherRef.current?.close();
  };

  const openRecharger = () => {
    recharcherRef.current?.expand();
  };
  // Logique retrait
  const closerRetirer = () => {
    retirerrRef.current?.close();
  };
  const openRetirer = () => {
    retirerrRef.current?.expand();
  };

  return (
    // @ts-ignore
      <BottomSheetRechargerContext.Provider value={{openRecharger, openRetirer}}>
      <GestureHandlerRootView>
      <View className="h-full w-full bg-white">
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderEpargne />
          <View className="mx-7 my-5 flex-row items-center">
            <Text style={{ flex: 3 }} className="text-2xl font-bold">
              TRANSACTION EPARGNES
            </Text>
          </View>
          <TransactionItems />
          <View className="my-3"></View>
        </ScrollView>
        {/*  */}
         
         

         
        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          ref={retirerrRef}
          enablePanDownToClose={true}
          backgroundStyle={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <BottomSheetView className="px-7">
            <View
              style={{ marginVertical: 25 }}
              className="flex-row items-center"
            >
              <Text
                style={{ fontFamily: "Poppins-Bold", flex: 7 }}
                className="text-xl"
              >
                Retirer de l'argent 
              </Text>
              <View style={{ flex: 1 }} className="">
                <Pressable onPress={closerRetirer}>
                  <Entypo name="circle-with-cross" size={24} color="#6d28d9" />
                </Pressable>
              </View>
            </View>
            <View className="gap-6">
              <TextInput
                placeholder="Numéro de téléphone "
                className="border border-gray-400 rounded-xl"
                style={{ paddingVertical: 15, paddingHorizontal: 9 }}
              />
              <TextInput
                placeholder="Montant de recharge"
                className="border border-gray-400 rounded-xl"
                style={{ paddingVertical: 15, paddingHorizontal: 9 }}
              />
              <View className=" bg-violet-600 rounded ">
                <Pressable
                  onPress={closerRetirer}
                  style={{ paddingVertical: 14 }}
                  android_ripple={{ color: "#6d28d9" }}
                >
                  <Text className="font-bold text-white text-center">
                    Retirer
                  </Text>
                </Pressable>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
        {/* Recharger */}
        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          ref={recharcherRef}
          enablePanDownToClose={true}
          backgroundStyle={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            }}
            >
            <BottomSheetView className="px-7">
            <View
            style={{ marginVertical: 25 }}
            className="flex-row items-center"
            >
            <Text
            style={{ fontFamily: "Poppins-Bold", flex: 7 }}
            className="text-xl"
            >
            Recharger mon compte épargne
            </Text>
            <View style={{ flex: 1 }} className="">
                <Pressable onPress={closeRecharger}>
                <Entypo name="circle-with-cross" size={24} color="#6d28d9" />
                </Pressable>
              </View>
            </View>
            <View className="gap-6">
            <TextInput
                placeholder="Numéro de téléphone "
                className="border border-gray-400 rounded-xl"
                style={{ paddingVertical: 15, paddingHorizontal: 9 }}
                />
                <TextInput
                placeholder="Montant de recharge"
                className="border border-gray-400 rounded-xl"
                style={{ paddingVertical: 15, paddingHorizontal: 9 }}
                />
                <View className=" bg-violet-600 rounded ">
                <Pressable
                onPress={closeRecharger}
                style={{ paddingVertical: 14 }}
                android_ripple={{ color: "#6d28d9" }}
                >
                  <Text className="font-bold text-white text-center">
                  Epargner
                  </Text>
                  </Pressable>
                  </View>
                  </View>
                  </BottomSheetView>
                  </BottomSheet>
      </View>
      </GestureHandlerRootView>
      </BottomSheetRechargerContext.Provider>
  );
};

export default index;
