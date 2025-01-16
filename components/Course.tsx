import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface CourseInterface {
  id: number;
  titre: string;
  url: string;
}

const Course: React.FC<CourseInterface> = ({ id, titre, url }) => {

  const router = useRouter()
  return (
    <View
      style={{ elevation: 2 }}
      className="bg-white h-[11rem] overflow-hidden border-gray-100 rounded-lg flex-1 mx-1 my-2"
    >
      <Pressable
        // @ts-ignore
        onPress={()=>router.push(`/epargne/${id}`)}
        className="overflow-hidden h-full"
        android_ripple={{ color: "#ccc" }}
      >
        <Image
          className="w-full  h-24"
          source={{uri:`http://192.168.1.7:8000/static/images/${url}`}}
        />
        <Text
          style={{ fontFamily: "Poppins-Bold" }}
          className="text-center py-3 text-gray-900"
        >
          {titre}
        </Text>
      </Pressable>
    </View>
  );
};

export default Course;
