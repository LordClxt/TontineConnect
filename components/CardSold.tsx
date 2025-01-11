

import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PrimaryButton from './ui/PrimaryButton'

export class CardSold extends Component {
  render() {
    return (
        <View
        style={{ elevation: 5 }}
        className="absolute gap-2 -bottom-[53px] rounded-xl w-full p-6 bg-white "
      >
        <Text  className='font-bold text-xl'>TON SOLDE</Text>
        <Text className="font-bold text-3xl text-violet-600">
          50.000 FCFA
        </Text>
        <View className="flex-row gap-1">
          <PrimaryButton>
            RECHARGER
          </PrimaryButton>
          <PrimaryButton>
            RETIRER
          </PrimaryButton>
          
        </View>
      </View>
    )
  }
}

export default CardSold