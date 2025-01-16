import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Status from "@/components/ui/Status";
import Tontines from "./Tontines";

const AllTontine = () => {
  const [select, setSelect] = useState('en cours');

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-white">
        <View className="bg-violet-600 justify-center h-[16rem]">
          <Text
            style={{
              fontFamily: "Poppins-Bold",
            }}
            className="text-center -mt-4 text-4xl text-white"
          >
            Mes tontines
          </Text>
        </View>
        <View className="flex-row ">
          <Status
            onPress={() => setSelect("en attente")}
            isSelected={select == "en attente"}
            text="En attente"
          />
          <Status
            onPress={() => setSelect("en cours")}
            isSelected={select == "en cours"}
            text="En cours"
          />
          <Status
            onPress={() => setSelect("terminée")}
            isSelected={select == "terminée"}
            text="Terminée"
          />
        </View>
        <View className="mx-7 my-5">
            <Tontines />
        </View>
      </View>
      </ScrollView>
    </>
  );
};

export default AllTontine;
