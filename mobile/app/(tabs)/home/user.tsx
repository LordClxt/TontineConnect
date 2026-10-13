import { ScrollView, View } from "react-native";
import React from "react";
import LineInfoProfile from "@/components/LineInfoProfile";
import T from "@/components/ui/T";
import store from "@/store";

const user = () => {
  const user = store((state) => state.user);
  const initials = `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <ScrollView className="bg-canvas" contentContainerClassName="pb-12">
      <View className="bg-brand items-center pt-4 pb-8 rounded-b-[32px] gap-3">
        <View className="w-24 h-24 rounded-full bg-white items-center justify-center">
          <T variant="title" className="text-brand-deep">
            {initials}
          </T>
        </View>
        <View className="items-center">
          <T variant="title" className="text-white">
            {user.prenom} {user.nom}
          </T>
          {user.username && (
            <T variant="body" className="text-white/75">
              @{user.username}
            </T>
          )}
        </View>
      </View>

      <View className="mx-6 mt-6 bg-white rounded-3xl px-4 border border-line">
        <LineInfoProfile icon="person-outline" left="Nom" right={user.nom} />
        <LineInfoProfile icon="person-outline" left="Prénom" right={user.prenom} />
        <LineInfoProfile icon="mail-outline" left="Email" right={user.email} />
        <LineInfoProfile icon="call-outline" left="Téléphone" right={user.tel} last />
      </View>
    </ScrollView>
  );
};

export default user;
