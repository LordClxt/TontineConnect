import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface ButtonProps {
    children:string;
    className?:string,
    onPress?:()=>void,
    rippleEffect:string
}

const Button: React.FC<ButtonProps> = ({children, rippleEffect, className, onPress}) => {
  
  return (
    <View className={`${className} text-white rounded-xl overflow-hidden`}>
      <Pressable className='py-2' onPress={onPress} android_ripple={{color:rippleEffect}}>
        <Text className='text-white font-bold text-center'>
            {children}
        </Text> 
      </Pressable>
    </View>
  )
}

export default Button