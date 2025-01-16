import { View, Text } from 'react-native'
import React from 'react'
import HeaderUserInfo from './HeaderUserInfo'
import CardSold from './CardSold'

const Header = () => {
  return (
    <View
        className="
          px-7
          w-full h-[200px]  bg-[#7C3AED]
          rounded-b-[40px] relative
          items-center
        "
      >
        <HeaderUserInfo />
        <CardSold />
      </View>
  )
}

export default Header