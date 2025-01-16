import { View, Text, ScrollView } from "react-native";
import React, { createContext, useRef, useState } from "react";
import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import TransactionItems from "@/components/ui/TransactionItems";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export const BottomSheetContext = createContext(null);

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

  const router = useRouter();
  return (
    // @ts-ignore
    <BottomSheetContext.Provider value={{ openRecharger, openRetirer }}>
      <View className={`w-full pb-2 h-full gap-2 bg-white`}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Header />
          {/* BOUTTON TONTINE */}
          <ActionButtons />
          {/* TRANSACTIONS */}
          <View className="mx-7 my-5 flex-row items-center">
            <Text style={{ flex: 3 }} className="text-xl font-bold">
              TRANSACTIONS RECENTE
            </Text>
            <Button
              rippleEffect="#6d28d9"
              onPress={() => router.push("/transaction")}
              className="flex-1 bg-violet-500"
            >
              voir tous
            </Button>
          </View>
          <TransactionItems />
        </ScrollView>
        {/* BottomSheet Section */}

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
                    Rétirer
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
                Recharger mon compte{" "}
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
                    Recharger
                  </Text>
                </Pressable>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>

        {/* BottomSheet Section */}
      </View>
    </BottomSheetContext.Provider>
  );
};

export default index;
