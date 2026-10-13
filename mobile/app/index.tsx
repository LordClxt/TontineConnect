import LoginPage from "@/components/Login/LoginPage";
import { Redirect } from "expo-router";
import React from "react";
import store from "@/store/index";

export default function Index() {
  const token = store((state) => state.token);

  if (token) {
    return <Redirect href="/home" />;
  }

  return <LoginPage />;
}
