import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "./ui/Button";
import { useRouter } from "expo-router";
import { BottomSheetRechargerContext } from "@/app/(tabs)/epargne";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import store from "@/store";
import LoadingOverlay from "./ui/LoadingOverlay";
import {SERVER_IP} from "@/app/constant/server_ip";

const HeaderEpargne = () => {

  const token = store((state) => state.token);
  const {data, isLoading} = useQuery({
    queryKey:['account_blockchain'],
    queryFn:()=>axios.get(
      `http://${SERVER_IP}:8000/blockchain/compte_utilisateur`,{
        headers:{
          'Authorization':`bearer ${token}`
        }
      }
    ).then(res=>res.data),
  });
  if(isLoading){
    return <LoadingOverlay />
  }
  // @ts-ignore
  const {openRecharger, openRetirer} = useContext(BottomSheetRechargerContext)
  const router = useRouter()

  return (
    <View className="px-5  bg-violet-600 justify-center py-14 rounded-b-[50px]">
      <View>
        <Text style={{ fontFamily: "Poppins-Bold" }} className="text-[1.4rem] text-white">
          SOLDE EPARGNE
        </Text>
        <Text
          style={{ fontFamily: "Poppins-Bold" }}
          className="text-white text-[2.5rem] "
        >
          {data?.compte_epargne} FCFA
        </Text>
      </View>
      <View className="gap-2">

        <View className="flex-row gap-1">
          <Button onPress={openRecharger} rippleEffect="" className="flex-1 border-2 border-white">
            EPARGNER
          </Button>
          <Button onPress={openRetirer} rippleEffect="" className="flex-1 border-2 border-white">
            RETIRER
          </Button>
        </View>
{/*  */}
        <View className="flex-row">
            <Button onPress={()=>router.push('/epargne/AllCourses')} rippleEffect="" className="flex-1 border-2 border-white">
                COURS SUR L'EPARGNE
            </Button>
        </View>

        <View>
        </View>
      </View>
    </View>
  );
};

export default HeaderEpargne;
