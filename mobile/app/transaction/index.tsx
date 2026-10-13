import { ScrollView, View } from "react-native";
import React from "react";
import SimpleHeader from "@/components/SimpleHeader";
import TransactionItems from "@/components/ui/TransactionItems";

const index = () => {
  return (
    <ScrollView className="bg-canvas" showsVerticalScrollIndicator={false} contentContainerClassName="pb-12">
      <SimpleHeader subtitle="Recharges, retraits, épargne et contributions.">Mes transactions</SimpleHeader>
      <View className="mt-6">
        <TransactionItems />
      </View>
    </ScrollView>
  );
};

export default index;
