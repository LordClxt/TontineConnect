
import { Redirect, Stack } from "expo-router";
import React, { useRef } from "react";
export default function Index() {


  return (
    <>
      <Stack.Screen options = {{
        headerShown: false
      }} />
      <Redirect href="/home" />
    </>
)
}
