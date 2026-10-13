import { View, Image, Pressable } from "react-native";
import React from "react";
import clsx from "clsx";
import T from "./ui/T";
import { staticUrl } from "@/api/epargneCourse";

interface CourseInterface {
  titre: string;
  url: string;
  active?: boolean;
  changeVide0: () => void;
}

const LargeCourse: React.FC<CourseInterface> = ({ titre, url, active, changeVide0 }) => {
  return (
    <Pressable onPress={changeVide0} className="flex-row items-center gap-3 py-3">
      <View className={clsx("w-28 rounded-xl overflow-hidden bg-tint", active && "border-2 border-brand")} style={{ aspectRatio: 16 / 10 }}>
        <Image className="w-full h-full" source={{ uri: staticUrl("images", url) }} />
      </View>
      <View className="flex-1 gap-1">
        <T variant="label" numberOfLines={2}>
          {titre}
        </T>
        {active && (
          <T variant="caption" className="text-brand-deep">
            En lecture
          </T>
        )}
      </View>
    </Pressable>
  );
};

export default LargeCourse;
