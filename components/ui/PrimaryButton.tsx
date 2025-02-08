import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface PrimaryButtonProps {
    children:string
    onPress:()=>void,
    disabled?:boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({children, onPress, disabled}) => {
  return (
    <View className="overflow-hidden rounded-lg flex-1">
        <Pressable disabled={disabled} onPress={onPress} className='py-3 disabled:bg-violet-300 bg-violet-500' android_ripple={{color:'#6d28d9'}}>
            <Text className="font-bold text-white text-center">
              {children}
            </Text>
        </Pressable>
    </View>
  )
}

export default PrimaryButton