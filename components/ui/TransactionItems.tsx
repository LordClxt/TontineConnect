import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TransactionItem from './TransactionItem'

const TransactionItems = () => {
  return (
    <View className="mx-7">
        
          <View className=" gap-2">
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
          </View>
      </View>
  )
}

export default TransactionItems