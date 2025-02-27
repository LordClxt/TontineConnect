import { View, Text, Image, ScrollView, StatusBar, Modal } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import { Link, Redirect, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import store from "@/store/index";
import { SERVER_IP } from "@/app/constant/server_ip";
const LoginPage = () => {
  const login = store((state) => state.login);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) =>
      axios
        .post(`http://${SERVER_IP}:8000/auth/token`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
    onSuccess: (data) => {
      setIsVisible(true)
      setTimeout(()=>{
        setIsVisible(false)
        login(data.access_token, data.user);
        router.push("/home");
      }, 1000)
    },
    onError: (error) => {
      // @ts-ignore
      setError(error.response.data.detail);
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
    };
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      <Modal visible={isVisible} animationType="fade" transparent={true}>
        <View
        style={{flex:1, alignItems:'center', justifyContent:'center'}}
        className="bg-black/50 backdrop-blur-sm"
        >
          <View className="bg-white w-4/5 p-10 rounded-lg">
          <Text className="text-center font-poppins font-bold text-xl">CONNEXION TERMINER</Text>

          </View>
        </View>
      </Modal>
      {/* <StatusBar barStyle="dark-content" /> */}
      <ScrollView className="bg-white h-full">
        <LinearGradient colors={["#A855F7", "#7C3AED"]}>
          <View className="h-[19rem] px-5 justify-center">
            <Text
              style={{ fontFamily: "Poppins-Bold" }}
              className="text-5xl py-3 text-center text-white"
            >
              CONNEXION
            </Text>
          </View>
        </LinearGradient>
        <View className={clsx("px-7 items-center", error ? "mt-5" : "mt-16")}>
          <View className="w-full">
            {error && (
              <View className="bg-red-200 p-7 rounded-lg">
                <Text className="text-red-800 font-bold">{error}</Text>
              </View>
            )}

            <Input
              onChange={(text) => setUsername(text)}
              value={username}
              label="Nom d'utilisateur"
            />
            <Input
              isPassword
              onChange={(text) => setPassword(text)}
              value={password}
              label="Mot de passe"
            />
            <View className="w-full my-2">
              <Text className="text-right text-violet-500 font-bold">
                Mot de passe oublié?
              </Text>
            </View>
            <View className="flex-row mt-1">
              <PrimaryButton
                disabled={!username || !password}
                onPress={handleSubmit}
              >
                Se connecter
              </PrimaryButton>
            </View>
          </View>
          <Link href="/Inscription" className="mt-4">
            <Text className="font-bold text-violet-800">S'inscrire</Text>
          </Link>
          {/* Ligne */}
          <View className="w-20 h-1 bg-violet-600 my-2 rounded-full"></View>
          <View className="flex-row mt-5 gap-3">
            <View
              style={{ flex: 1 }}
              className="items-center border border-gray-200 py-4 rounded-lg"
            >
              <Image
                className="w-10 h-10"
                source={require("@/assets/images/5D8s-GsHJlJ.png")}
              />
            </View>
            <View
              style={{ flex: 1 }}
              className="items-center border border-gray-200 py-4 rounded-lg"
            >
              <Image
                className="w-10 h-10"
                source={require("@/assets/images/apple.png")}
              />
            </View>
            <View
              style={{ flex: 1 }}
              className="items-center border border-gray-200 py-4 rounded-lg"
            >
              <Image
                className="w-10 h-10"
                source={require("@/assets/images/channels4_profile.jpg")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginPage;
