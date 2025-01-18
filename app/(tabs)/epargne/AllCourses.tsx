  import { View, Text, ScrollView } from "react-native";
  import React, { useState } from "react";
  import { Stack } from "expo-router";
  import SimpleHeader from "@/components/SimpleHeader";
  import Courses from "@/components/Courses";
  import { useQuery } from "@tanstack/react-query";
  import axios from "axios";
  import LoadingOverlay from "@/components/ui/LoadingOverlay";

  const AllCourses = () => {

    const {data, isLoading} = useQuery({
      queryKey:['epargne_cours'],
      queryFn:()=> axios.get('http://192.168.1.5:8000/Cours').then(response=>response.data)
    })

    if(isLoading){
      return <LoadingOverlay />
    }
    

    return (
      <>
        <Stack.Screen
          options={{
            title: "",
            //headerTransparent: true,
            headerStyle:{
              backgroundColor:'#7C3AED',            
            },
            headerShadowVisible:false
          }}
        />
        <ScrollView>

        <View>
          <SimpleHeader>COURS SUR L'EPARGNE</SimpleHeader>
          <View className="mx-7">
            <Text style={{ fontFamily: "Poppins-Bold" }} 
                  className="text- text-gray-800 text-center 
                  text-3xl my-3">
              COURS
            </Text>

            {/* TOUS LES COURS */}
            
            <Courses data={data} /> 
          </View>
          

        </View>
        </ScrollView>
      </>
    );
  };

  export default AllCourses;
