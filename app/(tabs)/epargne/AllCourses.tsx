  import { View, Text, ScrollView } from "react-native";
  import React, { useState } from "react";
  import { Stack } from "expo-router";
  import SimpleHeader from "@/components/SimpleHeader";
  import Courses from "@/components/Courses";
  import { useQuery } from "@tanstack/react-query";
  import axios from "axios";
  import LoadingOverlay from "@/components/ui/LoadingOverlay";
import store from "@/store";
import {SERVER_IP} from "@/app/constant/server_ip";

  const AllCourses = () => {

    const token = store(state=>state.token)
    const {data, isLoading} = useQuery({
      queryKey:['epargne_cours'],
      queryFn:()=> axios.get(`http://${SERVER_IP}:8000/Cours`, {
        headers:{
          'Authorization':`bearer ${token}`
        }
      }).then(response=>response.data)
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
