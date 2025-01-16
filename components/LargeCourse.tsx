import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface CourseInterface {
  id: number;
  titre: string;
  url: string;
  changeVide0:()=>void
}

const LargeCourse: React.FC<CourseInterface> = ({ id, titre, url, changeVide0 }) => {

  const router = useRouter()
  return (
    <View
        style={{elevation:2}}
      className="bg-white border border-gray-200 overflow-hidden 
      rounded-lg flex-1 mx-1 my-1"
    >
      <Pressable
        // @ts-ignore
        onPress={changeVide0}
        className="overflow-hidden h-full flex-row gap-2"
      >
        <Image
          className="w-32 rounded h-24"
          source={{uri:`http://192.168.1.7:8000/static/images/${url}`}}
        />
        <Text
        //   style={{ fontFamily: "Poppins-Bold" }}
          className="text-center py-3 text-gray-900 font-bold"
        >
          {titre}
        </Text>
      </Pressable>
    </View>
  );
};

export default LargeCourse;
