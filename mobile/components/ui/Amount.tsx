import { Text } from "react-native";
import React from "react";
import clsx from "clsx";
import { hasTextColor } from "./T";

// 125000 -> "125 000" (espace fine insécable, usage français)
export const formatAmount = (value?: number | string | null) => {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return String(value ?? "0");
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

interface AmountProps {
  value?: number | string | null;
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
  currencyClassName?: string;
}

const sizes = {
  xl: ["text-[40px] leading-[46px] tracking-tight", "text-[16px]"],
  lg: ["text-[28px] leading-[34px] tracking-tight", "text-[14px]"],
  md: ["text-[17px] leading-[22px]", "text-[12px]"],
  sm: ["text-[14px] leading-[18px]", "text-[11px]"],
} as const;

const Amount: React.FC<AmountProps> = ({ value, size = "md", className, currencyClassName }) => {
  const [numberClass, currencyClass] = sizes[size];
  return (
    <Text
      className={clsx("font-sora-bold", !hasTextColor(className) && "text-ink", numberClass, className)}
      style={{ fontVariant: ["tabular-nums"] }}
    >
      {formatAmount(value)}
      <Text className={clsx("font-sora-medium", currencyClass, currencyClassName)}>{" FCFA"}</Text>
    </Text>
  );
};

export default Amount;
