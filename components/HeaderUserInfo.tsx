import { View, Text } from 'react-native'
import React from 'react'

const HeaderUserInfo = () => {
  return (
    <View className="flex-row w-full mt-[15px] gap-3 items-center">
          <View className="w-20 h-20 rounded-full bg-gray-300"></View>
          <View className="">
            <Text className="font-bold text-white ">Good morning</Text>
            <Text  className="font-bold text-3xl text-white">Tinde Calixte</Text>
          </View>
        </View>
  )
}

export default HeaderUserInfo