import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AuthShell from "@/components/Login/AuthShell";

const Inscription = () => {
  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Quelques informations pour rejoindre vos premières tontines."
      footer={
        <Text className="font-sora text-[14px] text-muted">
          Déjà inscrit ?{" "}
          <Link href="/" dismissTo>
            <Text className="font-sora-semibold text-brand-deep">Se connecter</Text>
          </Link>
        </Text>
      }
    >
      <View className="flex-row gap-3">
        <Input className="flex-1" label="Nom" />
        <Input className="flex-1" label="Prénom" />
      </View>
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
      <Input label="Numéro de téléphone" keyboardType="phone-pad" autoComplete="tel" />
      <Input label="Mot de passe" isPassword />

      <View className="flex-row mt-4">
        <PrimaryButton onPress={() => {}}>Créer mon compte</PrimaryButton>
      </View>
    </AuthShell>
  );
};

export default Inscription;
