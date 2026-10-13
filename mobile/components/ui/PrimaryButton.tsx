import { Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import clsx from "clsx";
import { colors } from "@/constants/theme";

type Variant = "solid" | "onDark" | "ghostOnDark" | "outline";

interface PrimaryButtonProps {
  children: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
}

const styles: Record<Variant, { box: string; text: string; spinner: string }> = {
  // Action principale sur fond clair
  solid: { box: "bg-brand", text: "text-white", spinner: colors.white },
  // Action principale posée sur un header violet
  onDark: { box: "bg-white", text: "text-brand-deep", spinner: colors.brandDeep },
  // Action secondaire sur un header violet
  ghostOnDark: { box: "bg-white/15 border border-white/30", text: "text-white", spinner: colors.white },
  // Action secondaire sur fond clair
  outline: { box: "bg-white border border-line", text: "text-brand-deep", spinner: colors.brandDeep },
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onPress,
  disabled,
  loading,
  variant = "solid",
  size = "md",
  className = "flex-1",
}) => {
  const s = styles[variant];
  const inactive = disabled || loading;
  return (
    <Pressable
      disabled={inactive}
      onPress={onPress}
      android_ripple={{ color: "rgba(46,16,101,0.12)" }}
      className={clsx(
        "rounded-2xl items-center justify-center overflow-hidden",
        size === "md" ? "h-14 px-5" : "h-10 px-4",
        s.box,
        disabled && "opacity-40",
        className
      )}
      style={({ pressed }) => ({ transform: [{ scale: pressed && !inactive ? 0.98 : 1 }] })}
    >
      {loading ? (
        <ActivityIndicator color={s.spinner} />
      ) : (
        <Text className={clsx("font-sora-semibold", size === "md" ? "text-[15px]" : "text-[13px]", s.text)}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default PrimaryButton;
