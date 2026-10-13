import { View } from "react-native";
import React from "react";
import HeaderUserInfo from "./HeaderUserInfo";
import CardSold from "./CardSold";

const Header = () => {
  return (
    <View className="bg-brand px-6 pt-2 pb-7 rounded-b-[32px] gap-2">
      <HeaderUserInfo />
      <CardSold />
    </View>
  );
};

export default Header;
