import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import SimpleHeader from '@/components/SimpleHeader'
import TransactionItems from '@/components/ui/TransactionItems'

const index = () => {
  return (
    <>
        <Stack.Screen options={{
            title:'',
            headerTransparent:true,
        }}  />
        <View className='w-full h-full'>
            <SimpleHeader>MES TRANSACTIONS</SimpleHeader>
            <ScrollView  showsVerticalScrollIndicator={false} className='h-full my-4'>
                <TransactionItems />
            </ScrollView>
        </View>
    </>
  )
}

export default index