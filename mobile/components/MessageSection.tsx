import { View } from "react-native";
import React from "react";
import Message from "./Message";

export interface ChatMessage {
  message: string;
  type: "bot" | "user";
  key: string;
}

const MessageSection = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <View className="mx-5 gap-3">
      {messages.map((item) => (
        <Message message={item.message} type={item.type} key={item.key} />
      ))}
    </View>
  );
};

export default MessageSection;
