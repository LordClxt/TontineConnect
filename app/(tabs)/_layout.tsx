import { View, Text } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import store from "@/store";
const _layout = () => {

  const token = store((state)=>state.token)
  if(!token){
    router.replace('/')
  }

  const queryClient = new QueryClient()
  return (
    // <QueryClientProvider client={queryClient}>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#6d28d9",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Acceuil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="epargne"
          options={{
            title: "Epargne",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="mon_ia/index"
          options={{
            title: "Mon IA",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="robot" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    // </QueryClientProvider>
  );
};

export default _layout;
