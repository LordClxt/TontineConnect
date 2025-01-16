import { View, Text } from "react-native";
import React from "react";
import SimpleHeader from "@/components/SimpleHeader";
import LineInfoProfile from "@/components/LineInfoProfile";

const user = () => {
  return (
    <View>
      <View className="bg-violet-600 flex-row justify-center h-[9rem] relative">
        <View
          style={{ elevation: 3 }}
          className=" w-[24rem] bg-white absolute items-center gap-2 -bottom-[6rem] py-6 rounded-lg"
        >
          <View className="h-20 w-20 rounded-full bg-gray-600"></View>
          <View className="items-center px-2 gap-2">
            <Text className="font-bold">Tinde Pehe Calixte Hassan</Text>
            <Text className="text-gray-600">hassanetinde@gmail.com | 0151177360</Text>
          </View>
        </View>
      </View>

      <View className="mx-[3rem] mt-[8rem] bg-white rounded overflow-hidden">
          <LineInfoProfile left="Nom" right="Tinde" />
          <LineInfoProfile left="Prénom" right="Péhé Calixte Hassan" />
          <LineInfoProfile left="Email" right="hassanetinde@gmail.com" />
          <LineInfoProfile left="Tel" right="0151177360" />
      </View>
    </View>
  );
};

export default user;
