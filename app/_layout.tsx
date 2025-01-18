import { Stack } from "expo-router";
import "../global.css";
import React from "react";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout() {
  
  const [fontLoaded] = useFonts({
    'Poppins-Bold':require('@/assets/fonts/Poppins-Bold.ttf')
  })
 
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown:false,
          statusBarStyle:'dark'
        }} />
      </Stack>
    </QueryClientProvider>
  )
}
