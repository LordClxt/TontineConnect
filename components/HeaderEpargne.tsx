import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "./ui/Button";
import { useRouter } from "expo-router";
import { BottomSheetRechargerContext } from "@/app/(tabs)/epargne";

const HeaderEpargne = () => {

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
          20 000 FCFA
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
