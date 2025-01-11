import { View, Text } from 'react-native'
import React from 'react'

const TransactionItem = () => {
  return (
    <View
        className="flex-row justify-between border-2 p-5 rounded
            border-neutral-300            
        "
          >
        <View className="flex-1 gap-1">
            <Text className='font-bold'>Rechargement via wave</Text>
            <Text>12/12/1999</Text>
        </View>
        <View className="justify-center ">
            <View className="bg-violet-500 px-7 py-2 rounded-full ">
            <Text className="font-bold text-white">2000 fcfa</Text>
            </View>
        </View>
    </View>
  )
}

export default TransactionItem