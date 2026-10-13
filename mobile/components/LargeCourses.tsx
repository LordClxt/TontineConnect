import { View } from "react-native";
import React from "react";
import LargeCourse from "./LargeCourse";
import { Cours } from "@/api/epargneCourse";

interface LargeCoursesProps {
  data: Cours[];
  activeId?: number;
  changeVide0: (id: number) => void;
}

const LargeCourses = ({ data, activeId, changeVide0 }: LargeCoursesProps) => {
  return (
    <View>
      {data.map((item, i) => (
        <View key={item.id} className={i > 0 ? "border-t border-line" : undefined}>
          <LargeCourse
            active={item.id === activeId}
            changeVide0={() => changeVide0(item.id)}
            titre={item.titre}
            url={item.miniature}
          />
        </View>
      ))}
    </View>
  );
};

export default LargeCourses;
