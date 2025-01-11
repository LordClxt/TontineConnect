import { View, Text } from "react-native";
import React from "react";

interface SimpleHeaderProps {
    children:string
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({children}) => {
  return (
    <View className="bg-violet-600 h-[17rem] rounded-b-[60px]">
      <View className="h-full w-full items-center justify-center">
        <Text
          style={{ fontFamily: "Poppins-Bold" }}
          className="text-center font-poppins text-white text-4xl"
        >
          {children}
        </Text>
      </View>
    </View>
  );
};

export default SimpleHeader;
