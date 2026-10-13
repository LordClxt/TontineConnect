import { View, ScrollView } from "react-native";
import React from "react";
import SimpleHeader from "@/components/SimpleHeader";
import Courses from "@/components/Courses";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import T from "@/components/ui/T";
import { useCourses } from "@/api/epargneCourse";

const AllCourses = () => {
  const { data, isLoading } = useCourses();

  return (
    <ScrollView className="bg-canvas" showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
      <SimpleHeader subtitle="Des vidéos courtes pour mieux épargner, seul ou en groupe.">
        Apprendre à épargner
      </SimpleHeader>
      <View className="mx-6 mt-6">
        {isLoading ? (
          <LoadingOverlay />
        ) : data && data.length > 0 ? (
          <Courses data={data} />
        ) : (
          <T variant="body" className="text-muted text-center py-10">
            Aucun cours publié pour le moment.
          </T>
        )}
      </View>
    </ScrollView>
  );
};

export default AllCourses;
