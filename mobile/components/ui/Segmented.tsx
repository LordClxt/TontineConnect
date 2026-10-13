import { View, Pressable } from "react-native";
import React from "react";
import clsx from "clsx";
import T from "./T";

interface SegmentedProps<K extends string> {
  options: { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
  className?: string;
}

function Segmented<K extends string>({ options, value, onChange, className }: SegmentedProps<K>) {
  return (
    <View className={clsx("flex-row bg-tint rounded-2xl p-1", className)}>
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={clsx("flex-1 h-10 rounded-xl items-center justify-center", selected && "bg-white")}
            style={selected ? { shadowColor: "#2E1065", shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 } : undefined}
          >
            <T variant="label" className={selected ? "text-brand-deep" : "text-muted"}>
              {option.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

export default Segmented;
