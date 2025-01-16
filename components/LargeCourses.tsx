import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { COURS } from "@/data/DB";
import Course from "./Course";
import LargeCourse from './LargeCourse';
//@ts-ignore
const LargeCourses = ({data, changeVide0}) => {
  return (
    <FlatList
              
              keyExtractor={(item)=>item.id.toString()}
              renderItem={({item}) => (
                <LargeCourse changeVide0={()=>changeVide0(item.id)} id={item.id} titre={item.titre} url={item.miniature} />
              )}
              data={data}
              scrollEnabled={false}
            />
  )
}

export default LargeCourses
