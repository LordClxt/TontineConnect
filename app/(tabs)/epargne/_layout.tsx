import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const _layout = () => {
    
    const [fontLoaded] = useFonts({
        'Poppins-Bold':require('@/assets/fonts/Poppins-Bold.ttf')
    })
  return <Stack screenOptions={{

  }}>
    <Stack.Screen name='index' options={{
      headerShown:false
    }} />
  </Stack>
}

export default _layout