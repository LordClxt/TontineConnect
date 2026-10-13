/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Garder en phase avec constants/theme.ts
      colors: {
        brand: { DEFAULT: "#7C3AED", deep: "#6D28D9", light: "#A855F7" },
        tint: "#EDE9FE",
        mist: "#F5F3FF",
        canvas: "#FAF8FF",
        ink: "#2E1065",
        muted: "#6B6385",
        line: "#E9E5F5",
        danger: { DEFAULT: "#B42318", tint: "#FEE4E2" },
      },
      fontFamily: {
        sora: ["Sora_400Regular"],
        "sora-medium": ["Sora_500Medium"],
        "sora-semibold": ["Sora_600SemiBold"],
        "sora-bold": ["Sora_700Bold"],
        "sora-extrabold": ["Sora_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
