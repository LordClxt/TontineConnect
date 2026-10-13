import React, { useEffect } from "react";
import store from "@/store";
import { router } from "expo-router";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

const deconnexion = () => {
  const logout = store((state) => state.logout);
  useEffect(() => {
    logout();
    router.replace("/");
  }, []);
  return <LoadingOverlay />;
};

export default deconnexion;
