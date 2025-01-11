import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import TransactionItems from "@/components/ui/TransactionItems";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

const index = () => {

  const router = useRouter();
  return (
    <View className={`w-full pb-2 h-full gap-2`}>
      <Header />
      {/* BOUTTON TONTINE */}
      <ActionButtons />
      {/* TRANSACTIONS */}
      <View className="mx-7 mt-3 flex-row items-center">
        <Text style={{ flex: 3 }} className="text-xl font-bold">
          TRANSACTIONS RECENTE
        </Text>
        <Button
          rippleEffect="#6d28d9"
          onPress={() => router.push("/transaction")}
          className="flex-1 bg-violet-500 "
        >
          voir tous
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
        <TransactionItems />
      </ScrollView>
      
    </View>
  );
};

export default index;
