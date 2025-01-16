import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import SimpleHeader from '@/components/SimpleHeader'
import CreateTontineForm from '@/components/CreateTontineForm'

const CreeTontine = () => {
  return (
    <>
        <Stack.Screen options={{
            title:'',
            headerTransparent:true
        }} />
        <View>
            <View className='bg-violet-600 justify-center h-[19rem]'>
              <Text style={{
                fontFamily:'Poppins-Bold',
              }} className='text-center -mt-4 text-4xl text-white'>
                Crée une tontine
              </Text>
            </View>
            <View className=' h-full rounded-[50px] bg-white -mt-[3rem]'>
              <CreateTontineForm />
            </View>
        </View>
    </>
  )
}

export default CreeTontine