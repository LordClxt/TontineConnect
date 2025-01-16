import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingOverlay = () => {
  return (
    <View className='justify-center items-center h-full flex-1 p-20 bg-white'>
     <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  )
}

export default LoadingOverlay