import { View, Text, TextInput, Pressable } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import Input from "./ui/Input";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_IP } from "@/app/constant/server_ip";
import LoadingOverlay from "./ui/LoadingOverlay";
import store from "@/store";
import ModalSucces from "./ModalSuccesTransaction";
import { useRouter } from "expo-router";

const CreateTontineForm = () => {

  const token = store((state) => state.token);
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: (data) =>
      axios.post(`http://${SERVER_IP}:8000/blockchain/createTontine`, data,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':`bearer ${token}`
        }
      }),
    onSuccess:()=>{
      setIsVisible(true)
      setTimeout(()=>{
        setIsVisible(false)
        router.push("/tontine/AllTontine")
      })
      console.log("Terminer sans erreur");
    },
    onError:()=>{
      console.log("Une erreur c'est produite");
    }
  });

  const [nom, setNom] = useState("");
  const [montant, setMontamt] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [frequence, setFrequence] = useState("");
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = ()=>{
    const data = {
      nom:nom,
      montant:montant,
      frequnce:frequence,
      maxmembre:personnes
    }

    // @ts-ignore
    mutation.mutate(data)
  }
  return (
    <>
      {
        mutation.isPending && <LoadingOverlay />
      }
      <ModalSucces isVisible={isVisible} message="Création terminé avec success" />
      <View className="mt-[5rem] mx-5 gap-3 justify-center ">
        <Input
          onChange={(text) => setNom(text)}
          value={nom}
          label="Nom de la tontine"
          placeholder="Nom de la tontine ici"
        />
        <Input
          onChange={(text) => setMontamt(text)}
          value={montant}
          label="Montant par personne"
          placeholder="Renseigner le montant"
        />
        <Input
          onChange={(text) => setPersonnes(text)}
          value={personnes}
          label="Nombre de personne"
          placeholder="Renseigner le nombre de personne"
        />
        <Input
          onChange={(text) => setFrequence(text)}
          value={frequence}
          label="Frequence de paiement (Nombre de jour)"
          placeholder="Renseigner la frequence"
        />
        {/* <Input label='Date' /> */}
        <View className="gap-1">
          <View
            className="bg-gradient-to-b rounded-full my-2
          bg-violet-500 overflow-hidden"
          >
            <Pressable onPress={handleSubmit} android_ripple={{ color: "#6d28d9" }} className="py-3">
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                }}
                className="text-white text-center"
              >
                ENREGISTRER
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateTontineForm;
