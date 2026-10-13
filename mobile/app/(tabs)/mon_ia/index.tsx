import { View, Image, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import MessageSection, { ChatMessage } from "@/components/MessageSection";
import T from "@/components/ui/T";
import store from "@/store";
import { SERVER_IP } from "@/constants/server_ip";
import { colors, fonts } from "@/constants/theme";

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const suggestions = [
  "Comment fonctionne une tontine ?",
  "Comment fixer un objectif d'épargne ?",
  "Quel budget pour épargner chaque mois ?",
];

const index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const token = store((state) => state.token);
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  // Seul écran sur fond clair en haut : barre d'état sombre le temps du focus
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("dark");
      return () => setStatusBarStyle("light");
    }, [])
  );

  const addMessage = (message: string, type: ChatMessage["type"]) =>
    setMessages((current) => [...current, { message, type, key: generateUniqueId() }]);

  const mutation = useMutation({
    mutationFn: (data: { userRequest: string }) =>
      axios
        .post(`http://${SERVER_IP}:8000/Bot`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${token}`,
          },
        })
        .then((response) => response.data),
    onSuccess: (data) => addMessage(data.response, "bot"),
    onError: () => addMessage("Je n'arrive pas à joindre le serveur. Réessayez dans un instant.", "bot"),
  });

  const send = (text: string) => {
    const question = text.trim();
    if (!question || mutation.isPending) return;
    addMessage(question, "user");
    setInput("");
    mutation.mutate({ userRequest: question });
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-canvas" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View className="flex-row items-center gap-3 px-5 pb-4 bg-canvas border-b border-line" style={{ paddingTop: insets.top + 12 }}>
        <View className="w-11 h-11 rounded-full bg-tint items-center justify-center overflow-hidden">
          <Image className="w-8 h-8" source={require("@/assets/images/securite.png")} />
        </View>
        <View className="flex-1">
          <T variant="heading">Eliot</T>
          <T variant="caption" className="text-muted">
            Conseiller épargne et tontine
          </T>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="py-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 ? (
          <View className="mx-5 gap-4">
            <T variant="title">Posez votre question à Eliot</T>
            <T variant="body" className="text-muted">
              Il répond aux questions sur l'épargne, les tontines, le budget et la planification financière.
            </T>
            <View className="gap-2 mt-2">
              {suggestions.map((s) => (
                <Pressable key={s} onPress={() => send(s)} className="bg-white border border-line rounded-2xl px-4 py-3.5 flex-row items-center gap-3">
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.brandDeep} />
                  <T variant="label" className="flex-1">
                    {s}
                  </T>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <MessageSection messages={messages} />
        )}
        {mutation.isPending && (
          <View className="mx-5 mt-3 self-start bg-white border border-line rounded-3xl rounded-bl-md px-5 py-3">
            <ActivityIndicator size="small" color={colors.brand} />
          </View>
        )}
      </ScrollView>

      <View className="flex-row items-end gap-2 px-4 pt-3 pb-3 bg-white border-t border-line">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Votre question"
          placeholderTextColor="#A59CBF"
          multiline
          className="flex-1 min-h-12 max-h-32 bg-mist rounded-3xl px-4 pt-3 pb-3 text-ink"
          style={{ fontFamily: fonts.regular, fontSize: 15 }}
        />
        <Pressable
          onPress={() => send(input)}
          disabled={!input.trim() || mutation.isPending}
          accessibilityLabel="Envoyer"
          className="w-12 h-12 rounded-full bg-brand items-center justify-center disabled:opacity-40"
        >
          <Ionicons name="arrow-up" size={22} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default index;
