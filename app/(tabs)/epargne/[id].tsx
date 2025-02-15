import { View, Text, Dimensions, ScrollView } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import LargeCourses from "@/components/LargeCourses";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const localSource = require("@/assets/video/video.mp4");

const CoursePage = () => {

  const {data: courses, isLoading} = useQuery({
    queryKey:['epargne_cours'],
    queryFn:()=> axios.get('http://192.168.1.4:8000/Cours').then(response=>response.data)
  })


  if(isLoading){
    return <LoadingOverlay />
  }

  const {id} = useLocalSearchParams()
  
  // @ts-ignore
  const [activeVideo, setActiveVideo] = useState(courses.find(course=>course.id == +id))


  const changeVide0 = (id: number)=>{
    // @ts-ignore
    const videoSelected = courses.find((course)=>course.id == id)
    setActiveVideo(videoSelected)

  }

  // Player permet de manipuler la video
  const player = useVideoPlayer(`http://192.168.43.189:8000/static/videos/${activeVideo.video}`, (player) => {
    player.loop = true; //Permet de jouer la video en boucle // player.staysActiveInBackground = true; // Permet a la video de continuer a jouer meme si elle est en arriere plan
    player.play(); // Si nous voulons que la video se joue automatiquement
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "EXPO VIDEO",
          headerTitleAlign:'center'
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="pb-10 bg-white">

      
      <View className="w-full bg-white pb-5">
        <VideoView
          player={player}
          className="w-full"
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width * (9 / 16),
          }}
          allowsFullscreen
          allowsPictureInPicture
          startsPictureInPictureAutomatically // Permettent avec l'option preccedente de jouer la video meme en arriere plan
        />
        <View className="mx-4">
          <Text
            style={{
              fontFamily: "Poppins-Bold",
            }}
            className="my-5 uppercase text-xl"
          >
            {activeVideo.titre}
          </Text>


          <View className="bg-violet-300  mb-10 p-6 rounded-lg border-l-4 border-violet-700">
            <Text className="">
              {activeVideo.resume}
            </Text>
          </View>
          
          <LargeCourses changeVide0={changeVide0} data={courses} />

        </View>
      </View>
      </ScrollView>
    </>
  );
};

export default CoursePage;
