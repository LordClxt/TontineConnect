import { View } from "react-native";
import React from "react";
import clsx from "clsx";
import T from "./ui/T";

interface MessageInterface {
  message: string;
  type: string;
}

const Message: React.FC<MessageInterface> = ({ message, type }) => {
  const isBot = type === "bot";
  return (
    <View className={clsx(isBot ? "items-start" : "items-end")}>
      <View
        className={clsx(
          "max-w-[85%] px-4 py-3",
          isBot ? "bg-white border border-line rounded-3xl rounded-bl-md" : "bg-brand rounded-3xl rounded-br-md"
        )}
      >
        <T variant="body" className={isBot ? "text-ink" : "text-white"}>
          {message.replaceAll("*", "")}
        </T>
      </View>
    </View>
  );
};

export default Message;
