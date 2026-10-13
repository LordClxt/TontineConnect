import { View } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/constants/theme";

interface TontineRingProps {
  // Nombre de places dans le cercle
  total: number;
  // Places déjà prises
  filled: number;
  size?: number;
  tone?: "onDark" | "onLight";
  children?: React.ReactNode;
}

// Une tontine est un cercle : chaque point est un membre, les points pleins sont les places prises.
const TontineRing: React.FC<TontineRingProps> = ({ total, filled, size = 160, tone = "onLight", children }) => {
  const count = Math.max(2, Math.min(Math.round(total) || 2, 30));
  const taken = Math.max(0, Math.min(Math.round(filled) || 0, count));

  const dot = Math.max(3, Math.min(size / 22, 9));
  const stroke = Math.max(1.5, size / 90);
  const r = size / 2 - dot - stroke;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;

  const palette =
    tone === "onDark"
      ? { track: "rgba(255,255,255,0.22)", active: colors.white, hollow: colors.brand }
      : { track: colors.tint, active: colors.brand, hollow: colors.white };

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={c} cy={c} r={r} stroke={palette.track} strokeWidth={stroke} fill="none" />
        {taken > 0 && (
          <Circle
            cx={c}
            cy={c}
            r={r}
            stroke={palette.active}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(circumference * (taken - 1)) / count} ${circumference}`}
            transform={`rotate(-90 ${c} ${c})`}
          />
        )}
        {Array.from({ length: count }, (_, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const isTaken = i < taken;
          return (
            <Circle
              key={i}
              cx={c + r * Math.cos(angle)}
              cy={c + r * Math.sin(angle)}
              r={dot}
              fill={isTaken ? palette.active : palette.hollow}
              stroke={isTaken ? palette.active : palette.track}
              strokeWidth={stroke}
            />
          );
        })}
      </Svg>
      {children}
    </View>
  );
};

export default TontineRing;
