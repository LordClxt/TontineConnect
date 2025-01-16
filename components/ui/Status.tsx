import { View, Text, Pressable } from "react-native";
import React from "react";
import clsx from "clsx";

interface StatusProps {
  text: string;
  isSelected?: boolean;
  onPress?:()=>void
}

// @ts-ignore
const Status: React.FC<StatusProps> = ({ text, isSelected, onPress }) => {
  return (
        <Pressable style={{
            borderBottomWidth:isSelected ?3:0,
            borderBottomColor:'#7C3AED',
        }} className="flex-1 py-3" onPress={onPress}>
            <Text style={{
                fontFamily:'Poppins-Bold',
            }} className="text-center">{text}</Text>
        </Pressable>
  );
};

export default Status;
