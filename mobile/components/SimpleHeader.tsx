import { View } from "react-native";
import React from "react";
import clsx from "clsx";
import T from "./ui/T";

interface SimpleHeaderProps {
  children: string;
  subtitle?: string;
  className?: string;
  extra?: React.ReactNode;
}

// Bloc violet qui prolonge la barre de navigation en haut des écrans secondaires
const SimpleHeader: React.FC<SimpleHeaderProps> = ({ children, subtitle, className, extra }) => {
  return (
    <View className={clsx("bg-brand px-6 pt-2 pb-8 rounded-b-[32px]", className)}>
      <T variant="title" className="text-white">
        {children}
      </T>
      {subtitle && (
        <T variant="body" className="text-white/75 mt-1">
          {subtitle}
        </T>
      )}
      {extra}
    </View>
  );
};

export default SimpleHeader;
