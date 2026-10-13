import { View } from "react-native";
import React from "react";
import Course from "./Course";
import { Cours } from "@/api/epargneCourse";

// Grille 2 colonnes (sans FlatList : la page parente défile déjà)
const Courses = ({ data }: { data: Cours[] }) => {
  return (
    <View className="flex-row flex-wrap -mx-2">
      {data.map((item) => (
        <View key={item.id} className="w-1/2 px-2 mb-5">
          <Course id={item.id} titre={item.titre} url={item.miniature} />
        </View>
      ))}
    </View>
  );
};

export default Courses;
