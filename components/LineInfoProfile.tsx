import { View, Text } from 'react-native'
import React from 'react'

// @ts-ignore
const LineInfoProfile = ({left, right}) => {
  return (
    <View className='flex-row px-5 py-10 border-b border-violet-600'>
      <Text style={{flex:1, fontWeight:'semibold'}}>{left}:</Text>
      <Text style={{flex:3,}} className='text-violet-500 font-extrabold'>{right}</Text>
    </View>
  )
}

export default LineInfoProfile