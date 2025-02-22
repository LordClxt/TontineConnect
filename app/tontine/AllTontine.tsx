import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Status from "@/components/ui/Status";
import Tontines from "./Tontines";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_IP } from "../constant/server_ip";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import store from "@/store";

const AllTontine = () => {

  const token = store((state) => state.token);
  const user = store((state) => state.user);

  const {data, isLoading, isSuccess} = useQuery({
    queryKey:["tontines"],
    queryFn:()=>axios.get(`http://${SERVER_IP}:8000/blockchain/tontines`,{
      headers:{
        'Authorization':`bearer ${token}`
      }
    }).then(res=>res.data)
  })
  const [localData, setLocalData] = useState([])

  useEffect(()=>{
    if(isSuccess){
      setLocalData(data.tontines.filter((tontine:any)=>tontine.membres.includes(data.current_user)))
    }
  }, [data, isSuccess])
  const [select, setSelect] = useState('mes tontines');

  const handleSelect = ()=>{
    if(select == "mes tontines"){
      setSelect("autres tontines")
      setLocalData(data.tontines.filter((tontine:any)=>!tontine.membres.includes(data.current_user)))
    }
    else{
      setSelect("mes tontines")
      setLocalData(data.tontines.filter((tontine:any)=>tontine.membres.includes(data.current_user)))
    }
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          statusBarStyle:'dark'
          
        }}
      />
      <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <View className="bg-white">
        <View className="bg-violet-600 justify-center h-[16rem]">
          <Text
            style={{
              fontFamily: "Poppins-Bold",
            }}
            className="text-center mt-4 text-4xl text-white"
          >
            TONTINES
          </Text>
        </View>
        <View className="flex-row ">
          <Status
            onPress={handleSelect}
            isSelected={select == "mes tontines"}
            text="Mes tontine"
          />
          <Status
            onPress={handleSelect}
            isSelected={select == "autres tontines"}
            text="Autre tontines"
          />
        </View>
        <View className="mx-7 my-5">
          {
            isLoading ? <LoadingOverlay />:
            <Tontines currentUser={data.current_user}  tontines={localData} />
          }
        </View>
      </View>
      </ScrollView>
    </>
  );
};

export default AllTontine;
