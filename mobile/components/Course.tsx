import { View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import T from "./ui/T";
import { staticUrl } from "@/api/epargneCourse";

interface CourseInterface {
  id: number;
  titre: string;
  url: string;
}

const Course: React.FC<CourseInterface> = ({ id, titre, url }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/epargne/${id}`)} className="gap-2">
      <View className="rounded-2xl overflow-hidden bg-tint" style={{ aspectRatio: 16 / 10 }}>
        <Image className="w-full h-full" source={{ uri: staticUrl("images", url) }} />
        <View className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white/90 items-center justify-center">
          <Ionicons name="play" size={14} color="#6D28D9" style={{ marginLeft: 2 }} />
        </View>
      </View>
      <T variant="label" numberOfLines={2}>
        {titre}
      </T>
    </Pressable>
  );
};

export default Course;
