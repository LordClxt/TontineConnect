import { View, Text, TextInput } from "react-native";
import React from "react";

interface InputInterface {
  name?: string;
  label: string;
  value?: string;
  placeholder?: string;
}

const Input: React.FC<InputInterface> = ({
  name,
  label,
  value,
  placeholder,
}) => {
  return (
    <View className="gap-1 my-2">
      <Text
        style={{
          fontFamily: "Poppins-Bold",
        }}
        className="text-gray-800"
      >
        {label}
      </Text>
      <TextInput placeholder={placeholder} className="border border-gray-400 rounded-xl px-2" />
    </View>
  );
};

export default Input;
