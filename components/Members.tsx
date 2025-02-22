import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Members = ({membres}) => {
  return (
    <FlatList
        scrollEnabled={false}
        data={membres}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>{
            return <View className='m-5 rounded border border-gray-200 overflow-hidden  p-7 bg-white' style={{elevation:2}}>
                <Text className='font-bold text-lg'>{item.nom} {item.prenom}</Text>
            </View>
        }}
    />
  )
}

export default Members