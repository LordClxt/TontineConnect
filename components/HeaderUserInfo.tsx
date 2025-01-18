import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import store from '@/store'
import { Ionicons } from '@expo/vector-icons'

const HeaderUserInfo = () => {
  const user = store((state)=>state.user)
  return (
    <View className="flex-row w-full mt-[15px] gap-3 items-center">
          <View className="w-20 h-20 rounded-full bg-gray-300 justify-center items-center">
            <Ionicons name='person' size={50} />
          </View>
          <View className="">
            <Text className="font-bold text-white ">Bonjour</Text>
            <Text  className="font-bold text-3xl text-white">{user.nom} {user.prenom}</Text>
          </View>
        </View>
  )
}

export default HeaderUserInfo