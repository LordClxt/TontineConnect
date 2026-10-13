import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import T from "../ui/T";
import AuthShell from "./AuthShell";
import ModalSucces from "../ModalSuccesTransaction";
import store, { User } from "@/store/index";
import { SERVER_IP } from "@/constants/server_ip";
import { colors } from "@/constants/theme";

interface LoginResponse {
  access_token: string;
  user: User;
}

const LoginPage = () => {
  const login = store((state) => state.login);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      axios
        .post<LoginResponse>(`http://${SERVER_IP}:8000/auth/token`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
    onSuccess: (data) => {
      setError("");
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        login(data.access_token, data.user);
        router.replace("/home");
      }, 1000);
    },
    onError: (err) => {
      // @ts-ignore
      setError(err.response?.data?.detail ?? "Serveur injoignable. Vérifiez votre connexion puis réessayez.");
    },
  });

  return (
    <>
      <ModalSucces isVisible={isVisible} message="Connexion réussie" />
      <AuthShell
        title="Connexion"
        subtitle="Retrouvez vos tontines et votre épargne."
        footer={
          <Text className="font-sora text-[14px] text-muted">
            Pas encore de compte ?{" "}
            <Link href="/Inscription">
              <Text className="font-sora-semibold text-brand-deep">S'inscrire</Text>
            </Link>
          </Text>
        }
      >
        {error ? (
          <View className="flex-row gap-2 items-start bg-danger-tint rounded-2xl p-4 mb-2">
            <Ionicons name="alert-circle" size={18} color={colors.danger} />
            <T variant="label" className="flex-1 text-danger">
              {error}
            </T>
          </View>
        ) : null}

        <Input
          onChange={setUsername}
          value={username}
          label="Nom d'utilisateur"
          placeholder="ex. awa.kone"
          autoCapitalize="none"
          autoComplete="username"
        />
        <Input isPassword onChange={setPassword} value={password} label="Mot de passe" autoComplete="password" />
        <T variant="label" className="text-right text-brand-deep mt-1 mb-5">
          Mot de passe oublié ?
        </T>
        <View className="flex-row">
          <PrimaryButton
            disabled={!username || !password}
            loading={mutation.isPending}
            onPress={() => mutation.mutate({ username, password })}
          >
            Se connecter
          </PrimaryButton>
        </View>
      </AuthShell>
    </>
  );
};

export default LoginPage;
