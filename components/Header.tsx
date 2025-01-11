import { View, Text } from 'react-native'
import React from 'react'
import HeaderUserInfo from './HeaderUserInfo'
import CardSold from './CardSold'

const Header = () => {
  return (
    <View
        className="
          px-7
          w-full h-[270px]  bg-violet-600
          rounded-b-[60px] relative
          items-center
        "
      >
        <HeaderUserInfo />
        <CardSold />
      </View>
  )
}

export default Header