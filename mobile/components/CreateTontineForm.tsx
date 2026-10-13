import { View } from "react-native";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import Input from "./ui/Input";
import PrimaryButton from "./ui/PrimaryButton";
import Amount from "./ui/Amount";
import T from "./ui/T";
import ModalSucces from "./ModalSuccesTransaction";
import TontineRing from "./tontine/TontineRing";
import { SERVER_IP } from "@/constants/server_ip";
import store from "@/store";

const CreateTontineForm = () => {
  const token = store((state) => state.token);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [nom, setNom] = useState("");
  const [montant, setMontamt] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [frequence, setFrequence] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: Record<string, string>) =>
      axios.post(`http://${SERVER_IP}:8000/blockchain/createTontine`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tontines"] });
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        router.replace("/tontine/AllTontine");
      }, 1500);
    },
    onError: () => {
      console.log("Une erreur c'est produite");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      nom: nom,
      montant: montant,
      frequnce: frequence,
      maxmembre: personnes,
    });
  };

  const size = Number(personnes) || 0;
  const pot = (Number(montant) || 0) * size;

  return (
    <>
      <ModalSucces isVisible={isVisible} message="Tontine créée" />

      {/* Aperçu du cercle, mis à jour pendant la saisie */}
      <View className="mx-6 mt-6 p-5 bg-white rounded-3xl border border-line flex-row items-center gap-5">
        <TontineRing total={size || 6} filled={0} size={84}>
          <T variant="label" className="text-brand-deep">
            {size || "–"}
          </T>
        </TontineRing>
        <View className="flex-1 gap-1">
          <T variant="caption" className="text-muted">
            Chaque bénéficiaire reçoit
          </T>
          <Amount value={pot} size="lg" className="text-brand-deep" />
          <T variant="caption" className="text-muted">
            {frequence ? `tous les ${frequence} jours` : "à chaque tour"}
          </T>
        </View>
      </View>

      <View className="mx-6 mt-4">
        <Input onChange={setNom} value={nom} label="Nom de la tontine" placeholder="ex. Tontine du quartier" />
        <View className="flex-row gap-3">
          <Input
            className="flex-1"
            onChange={setMontamt}
            value={montant}
            keyboardType="number-pad"
            label="Cotisation (FCFA)"
            placeholder="5000"
          />
          <Input
            className="flex-1"
            onChange={setPersonnes}
            value={personnes}
            keyboardType="number-pad"
            label="Membres"
            placeholder="10"
          />
        </View>
        <Input
          onChange={setFrequence}
          value={frequence}
          keyboardType="number-pad"
          label="Fréquence (en jours)"
          placeholder="7"
          hint="Intervalle entre deux distributions."
        />
        <View className="flex-row mt-4">
          <PrimaryButton
            disabled={!nom || !montant || !personnes || !frequence}
            loading={mutation.isPending}
            onPress={handleSubmit}
          >
            Créer la tontine
          </PrimaryButton>
        </View>
      </View>
    </>
  );
};

export default CreateTontineForm;
