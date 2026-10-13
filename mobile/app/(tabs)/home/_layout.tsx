import React from "react";
import { Pressable, View } from "react-native";
import { Drawer, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import T from "@/components/ui/T";
import store from "@/store";
import { colors, fonts } from "@/constants/theme";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const user = store((state) => state.user);
  const initials = `${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase() || "?";
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View className="px-5 pt-6 pb-6 mb-2 border-b border-line flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full bg-tint items-center justify-center">
          <T variant="heading" className="text-brand-deep">
            {initials}
          </T>
        </View>
        <View className="flex-1">
          <T variant="heading" numberOfLines={1}>
            {user.prenom} {user.nom}
          </T>
          <T variant="caption" className="text-muted" numberOfLines={1}>
            {user.email}
          </T>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const _layout = () => {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} hitSlop={12} accessibilityLabel="Ouvrir le menu" className="ml-4">
            <Ionicons name="menu" size={26} color={colors.white} />
          </Pressable>
        ),
        headerStyle: { backgroundColor: colors.brand },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.white },
        headerTintColor: colors.white,
        drawerActiveTintColor: colors.brandDeep,
        drawerInactiveTintColor: colors.ink,
        drawerActiveBackgroundColor: colors.tint,
        drawerLabelStyle: { fontFamily: fonts.medium, fontSize: 15 },
        drawerItemStyle: { borderRadius: 16, marginHorizontal: 4 },
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "TontineConnect",
          drawerLabel: "Accueil",
          headerRight: () => (
            <Pressable hitSlop={12} accessibilityLabel="Notifications" className="mr-4">
              <Ionicons name="notifications-outline" size={24} color={colors.white} />
            </Pressable>
          ),
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="user"
        options={{
          title: "Mon profil",
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="parametre"
        options={{
          title: "Paramètres",
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="deconnexion"
        options={{
          title: "Se déconnecter",
          drawerIcon: ({ size }) => <Ionicons name="log-out-outline" color={colors.danger} size={size} />,
          drawerLabelStyle: { fontFamily: fonts.medium, fontSize: 15, color: colors.danger },
          drawerItemStyle: { borderRadius: 16, marginHorizontal: 4, marginTop: 24 },
        }}
      />
    </Drawer>
  );
};

export default _layout;
