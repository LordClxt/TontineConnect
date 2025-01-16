import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';
// @ts-ignore
const CloseButton = ({onPress}) => {
  return (
    <View style={{flex:1}} className=''>
        <Pressable onPress={onPress}>
            <Entypo name="circle-with-cross" size={24} color="#6d28d9" />
        </Pressable>
    </View>
  )
}

export default CloseButton