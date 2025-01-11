import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <Redirect href="/home" />
    </>
)
}
