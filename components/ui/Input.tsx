import { View, Text, TextInput } from "react-native";
import React from "react";

interface InputInterface {
  name?: string;
  label: string;
  value?: string;
  placeholder?: string;
  onChange?:((text:string)=>void) | undefined,
  isPassword?:boolean,
}

const Input: React.FC<InputInterface> = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  isPassword,
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
      <TextInput secureTextEntry={isPassword} value={value} onChangeText={onChange} placeholder={placeholder} className="border border-gray-400 rounded-xl px-3" />
    </View>
  );
};

export default Input;
