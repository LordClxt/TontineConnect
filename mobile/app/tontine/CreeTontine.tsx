import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import SimpleHeader from "@/components/SimpleHeader";
import CreateTontineForm from "@/components/CreateTontineForm";

const CreeTontine = () => {
  return (
    <KeyboardAvoidingView className="flex-1 bg-canvas" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerClassName="pb-12">
        <SimpleHeader subtitle="Fixez les règles du cercle. Elles seront inscrites sur la blockchain.">
          Créer une tontine
        </SimpleHeader>
        <CreateTontineForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreeTontine;
