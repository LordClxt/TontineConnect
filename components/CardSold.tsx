

import { Text, View } from 'react-native'
import React, { Component, useContext } from 'react'
import PrimaryButton from './ui/PrimaryButton'
import { BottomSheetContext } from '@/app/(tabs)/home'

export const CardSold = ()=> {
  // @ts-ignore
    const {openRecharger, openRetirer} = useContext(BottomSheetContext)
    return (
        <View
        style={{ elevation: 5 }}
        className="absolute gap-2 -bottom-[53px] rounded-xl w-full p-5 bg-white "
      >
        <Text  className='font-bold text-xl'>TON SOLDE</Text>
        <Text className="font-bold text-3xl text-violet-600">
          1.000.000.000 FCFA
        </Text>
        <View className="flex-row gap-1">
          <PrimaryButton onPress={openRecharger}>
            RECHARGER
          </PrimaryButton>
          <PrimaryButton onPress={openRetirer}>
            RETIRER
          </PrimaryButton>
          
        </View>
      </View>
    )
  }


export default CardSold