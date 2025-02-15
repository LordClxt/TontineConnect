import { View, Text } from 'react-native'
import React from 'react'

interface TransactionInterface {
  nom:string;
  montant:string
  date:string
}

const TransactionItem = ({nom, montant, date}:TransactionInterface) => {
  return (
    <View
        className="flex-row justify-between border-2 p-5 rounded
            border-neutral-300            
        "
          >
        <View className="flex-1 gap-1">
            <Text className='font-bold'>{nom}</Text>
            <Text>{date}</Text>
        </View>
        <View className="justify-center w-1/3 items-center">
            <View className="bg-violet-500 w-full py-2 rounded-full ">
            <Text className="font-bold text-white text-center">{montant} fcfa</Text>
            </View>
        </View>
    </View>
  )
}

export default TransactionItem