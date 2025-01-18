import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface PrimaryButtonProps {
    children:string
    onPress:()=>void
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({children, onPress}) => {
  return (
    <View className=" bg-violet-500 rounded-lg flex-1">
        <Pressable onPress={onPress} className='py-3' android_ripple={{color:'#6d28d9'}}>
            <Text className="font-bold text-white text-center">
              {children}
            </Text>
        </Pressable>
    </View>
  )
}

export default PrimaryButton