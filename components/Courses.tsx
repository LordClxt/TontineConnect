import { View, Text, FlatList } from "react-native";
import React from "react";

import { COURS } from "@/data/DB";
import Course from "./Course";


// @ts-ignore
const Courses = ({data}) => {
  return <FlatList
              
              keyExtractor={(item)=>item.id.toString()}
              renderItem={({item}) => (
                <Course id={item.id} titre={item.titre} url={item.miniature} />
              )}
              data={data}
              numColumns={2}
              scrollEnabled={false}
            />;
};

export default Courses;
