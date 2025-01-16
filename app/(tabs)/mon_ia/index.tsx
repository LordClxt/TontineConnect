import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MessageSection from "@/components/MessageSection";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const index = () => {
  const [messages, setMessages] = useState([]);

  const mutation = useMutation({
    mutationFn: (data) =>
      axios
        .post("http://192.168.41.221:8000/Bot", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
    onSuccess: (data) => {
      //@ts-ignore
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          message: data.response,
          type: "bot",
          key: generateUniqueId(),
        },
      ]);
    },
    onError: (err) => {
      //@ts-ignore
      console.log(err.response.data);
    },
  });

  const [input, setInput] = useState("");

  const changeHandler = (text: string) => {
    setInput(text);
  };

  const submitHandler = () => {
    const data = {
      userRequest: input,
    };
    // Ajout au mesage existant
    //@ts-ignore
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        message: input,
        type: "user",
        key: generateUniqueId(),
      },
    ]);

    // Renitialisation du champ input
    setInput("");

    //@ts-ignore
    mutation.mutate(data);
  };

  return (
    <View className="bg-white relative w-full h-full">
      <ScrollView>
        <View className="flex-row h-[4rem] my-3 mx-3 items-center gap-3 ">
          <Text
            style={{ fontFamily: "Poppins-Bold", flex: 3 }}
            className="  uppercase text-violet-600 text-2xl text-right"
          >
            Hello, je suis ELIOT
          </Text>
          <View style={{ flex: 1 }} className="">
            <Image
              className="w-16 h-16 "
              source={require("@/assets/images/securite.png")}
            />
          </View>
        </View>

        {/* Message Section */}

        <MessageSection messages={messages} />
      </ScrollView>

      <View
        style={{ zIndex: 10 }}
        className="absolute gap-2 flex-row rounded-t-[20px] px-4 left-0 pb-6 pt-8 right-0 bottom-0 bg-violet-600"
      >
        <TextInput
          value={input}
          onChangeText={changeHandler}
          style={{ flex: 6 }}
          placeholder="Votre question ici"
          className="placeholder:text-white  text-white bg-violet-500 rounded-lg px-4
          "
        />
        {!mutation.isPending && (
          <Pressable
            android_ripple={{ color: "#ccc" }}
            onPress={submitHandler}
            className="flex-1 bg-white rounded-lg justify-center items-center"
          >
            <Ionicons
              name="send"
              color="#7C3AED"
              className="text-center"
              size={24}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default index;
