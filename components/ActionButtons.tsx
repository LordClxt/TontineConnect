import { View, Text } from 'react-native'
import React from 'react'
import ActionButton from './ui/ActionButton'
import { Ionicons } from '@expo/vector-icons'

const ActionButtons = () => {
  return (
    <View className="mt-20 mx-7 flex-row gap-2">
        <ActionButton color='#6d28d9' name='add'>
            Crée tontine
        </ActionButton>
        <ActionButton color='#6d28d9' name='cash-outline'>
            Mes tontines
        </ActionButton>
        <ActionButton color='#6d28d9' name='walk-outline'>
            Adhérer tontine
        </ActionButton>
      </View>
  )
}

export default ActionButtons