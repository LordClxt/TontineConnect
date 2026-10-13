import { View, Dimensions, ScrollView } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import LargeCourses from "@/components/LargeCourses";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import T from "@/components/ui/T";
import { Cours, staticUrl, useCourses } from "@/api/epargneCourse";

const Player = ({ courses, initialId }: { courses: Cours[]; initialId: number }) => {
  const [activeVideo, setActiveVideo] = useState<Cours>(
    () => courses.find((course) => course.id === initialId) ?? courses[0]
  );

  // Player permet de manipuler la video
  const player = useVideoPlayer(staticUrl("videos", activeVideo.video), (player) => {
    player.loop = true;
    player.play();
  });

  // useVideoPlayer ne suit pas les changements de source : on remplace à la main
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    player.replace(staticUrl("videos", activeVideo.video));
    player.play();
  }, [activeVideo]);

  const width = Dimensions.get("window").width;

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-canvas" contentContainerClassName="pb-12">
      <VideoView
        player={player}
        style={{ width, height: width * (9 / 16), backgroundColor: "#000" }}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
        startsPictureInPictureAutomatically // Permettent avec l'option precedente de jouer la video meme en arriere plan
      />
      <View className="mx-6">
        <T variant="title" className="mt-6 mb-4">
          {activeVideo.titre}
        </T>
        <View className="bg-mist rounded-2xl p-5 border-l-4 border-brand mb-8">
          <T variant="body" className="text-ink">
            {activeVideo.resume}
          </T>
        </View>

        <T variant="heading" className="mb-1">
          Autres cours
        </T>
        <LargeCourses
          activeId={activeVideo.id}
          changeVide0={(id) => setActiveVideo(courses.find((course) => course.id === id) ?? activeVideo)}
          data={courses}
        />
      </View>
    </ScrollView>
  );
};

const CoursePage = () => {
  const { id } = useLocalSearchParams();
  const { data: courses, isLoading } = useCourses();

  if (isLoading || !courses || courses.length === 0) {
    return <LoadingOverlay />;
  }

  return <Player courses={courses} initialId={Number(id)} />;
};

export default CoursePage;
