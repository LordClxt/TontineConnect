import { View, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import clsx from "clsx";
import T from "./T";
import { colors, fonts } from "@/constants/theme";

interface InputInterface {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  isPassword?: boolean;
  hint?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  className?: string;
}

const Input: React.FC<InputInterface> = ({
  label,
  value,
  placeholder,
  onChange,
  isPassword,
  hint,
  keyboardType,
  autoCapitalize,
  autoComplete,
  className,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <View className={clsx("gap-1.5 my-2", className)}>
      <T variant="label" className="text-ink">
        {label}
      </T>
      <TextInput
        secureTextEntry={isPassword}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#A59CBF"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? (isPassword ? "none" : undefined)}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={clsx(
          "h-14 rounded-2xl px-4 bg-white text-ink",
          focused ? "border-2 border-brand" : "border border-line"
        )}
        style={{ fontFamily: fonts.regular, fontSize: 15 }}
        selectionColor={colors.brand}
      />
      {hint && (
        <T variant="caption" className="text-muted">
          {hint}
        </T>
      )}
    </View>
  );
};

export default Input;
