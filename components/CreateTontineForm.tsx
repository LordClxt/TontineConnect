import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import Input from "./ui/Input";
import { Picker } from "@react-native-picker/picker";

const CreateTontineForm = () => {
  return (
    <View className="mt-[7rem] mx-5 gap-3 justify-center ">
      <Input label="Nom de la tontine" placeholder="Nom de la tontine ici" />
      <Input label="Montant par personne" placeholder="Renseigner le montant" />
      {/* <Input label='Date' /> */}
      <View className="gap-1">
        <Text
          style={{
            fontFamily: "Poppins-Bold",
          }}
          className="text-gray-800"
        >
          Frequence des paiements
        </Text>
        <View className="border  rounded-xl border-gray-400">
          <Picker
            selectedValue={null}
            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C++" value="cpp" />
          </Picker>
        </View>

        <View className="bg-gradient-to-b rounded-full my-2
         bg-violet-500 overflow-hidden">
          <Pressable android_ripple={{color:'#6d28d9'}} className="py-3">
            <Text
              style={{
                fontFamily: "Poppins-Bold",
              }}
              className="text-white text-center"
            >
              SUIVANT
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreateTontineForm;
