import { Text, TextProps } from "react-native";
import React from "react";
import clsx from "clsx";

type Variant = "display" | "title" | "heading" | "body" | "label" | "caption";

// Échelle typographique unique de l'app (Sora)
const variants: Record<Variant, string> = {
  display: "font-sora-extrabold text-[36px] leading-[42px] tracking-tight",
  title: "font-sora-bold text-[24px] leading-[30px] tracking-tight",
  heading: "font-sora-semibold text-[17px] leading-[24px]",
  body: "font-sora text-[15px] leading-[22px]",
  label: "font-sora-medium text-[13px] leading-[18px]",
  caption: "font-sora text-[12px] leading-[16px]",
};

interface TProps extends TextProps {
  variant?: Variant;
  className?: string;
}

// NativeWind ne résout pas les conflits de classes : la couleur par défaut
// n'est appliquée que si aucune couleur de texte n'est fournie.
export const hasTextColor = (className?: string) =>
  !!className && /(^|\s)text-(ink|muted|white|brand|danger|tint|mist)/.test(className);

const T: React.FC<TProps> = ({ variant = "body", className, ...props }) => (
  <Text className={clsx(variants[variant], !hasTextColor(className) && "text-ink", className)} {...props} />
);

export default T;
