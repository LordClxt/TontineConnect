
import LoginPage from "@/components/Login/LoginPage";
import { Redirect, Stack } from "expo-router";
import React, { useRef } from "react";
import store from '@/store/index'

export default function Index() {

  const token = store((state)=>state.token)
  if (token){
    return <>
    <Stack.Screen options = {{
      headerShown: false
    }} />
    <Redirect href="/home" />
    {/* <LoginPage /> */}
  </>
  }
  

  return (
    <>
    
      <Stack.Screen options = {{
        headerShown: false,
        statusBarStyle:'dark'
      }} />
      {/* <Redirect href="/home" /> */}
      <LoginPage />
    </>
)
}
