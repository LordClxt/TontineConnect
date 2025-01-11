import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface UserIconProps {
    size:number
    color:string
}

const UserIcon: React.FC<UserIconProps> = ({size, color}) => {
  return (
    <View className='w-10 h-10 bg-violet-900 border rounded-full'>
      <Text className='bg-violet-400 text-violet-900'>TC</Text>
    </View>
  )
}

export default UserIcon