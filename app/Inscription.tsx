import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Input from '@/components/ui/Input'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { Link, Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
const Inscription = () => {
  const router = useRouter()
  return (
    <>
      <Stack.Screen options={{
        // headerShown:false,
        headerTransparent:true,
        title:'',
      }} />
      <ScrollView className="bg-white h-full">
        <LinearGradient colors={["#A855F7", "#7C3AED"]}>
          <View className="h-[17rem] px-5 justify-center">
            <Text
              style={{ fontFamily: "Poppins-Bold" }}
              className="text-5xl mt-4 py-3 text-center text-white"
            >INSCRIPTION</Text>
          </View>
        </LinearGradient>
        <View className="px-7 mt-5 items-center pb-12">
          <View className='w-full'>
              <Input label="Nom" />
              <Input label="Prenom" />
              <Input label="Email" />
              <Input label="Numéro de téléphone" />
              <Input label="Mot de passe" />
              
              <View className="flex-row mt-1">
                  <PrimaryButton onPress={()=>{ }}>
                      S'inscrire
                  </PrimaryButton>
              </View> 
          </View>
          <View className="w-20 h-1 bg-violet-600 my-10 rounded-full"></View>
          <View className="flex-row  gap-3">
              <View style={{flex:1}} className="items-center border border-gray-200 py-4 rounded-lg">
                  <Image className="w-10 h-10" source={require('@/assets/images/5D8s-GsHJlJ.png')} />
              </View>
              <View style={{flex:1}} className="items-center border border-gray-200 py-4 rounded-lg">
                  <Image className="w-10 h-10" source={require('@/assets/images/apple.png')} />
              </View>
              <View style={{flex:1}} className="items-center border border-gray-200 py-4 rounded-lg">
                  <Image className="w-10 h-10" source={require('@/assets/images/channels4_profile.jpg')} />
              </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Inscription