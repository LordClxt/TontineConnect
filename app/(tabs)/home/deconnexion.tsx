import { View, Text } from 'react-native'
import React from 'react'
import store from '@/store'
import { router } from 'expo-router'

const deconnexion = () => {
  const logout = store((state)=>state.logout)
  logout()
  router.replace('/')
}

export default deconnexion