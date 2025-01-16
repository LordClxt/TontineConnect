import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import UserIcon from "@/components/ui/userIcon";

const _layout = () => {
  return (
    <Drawer
      screenOptions={({navigation})=>({
        headerLeft: () => (
          <Ionicons
            style={{ marginLeft: 12 }}
            name="menu"
            size={30}
            color="white"
            onPress={()=>navigation.toggleDrawer()}
          />
        ),
        drawerItemStyle:{
          borderRadius:0,
          borderBottomWidth:3,
          borderBottomColor:'#6d28d9',
          paddingVertical:15,
        },
        drawerActiveTintColor:'#6d28d9',
        drawerInactiveTintColor:'#6d28d9',
        drawerActiveBackgroundColor:'white',
        headerStyle:{
          backgroundColor:'#7C3AED',
          shadowColor:'#7C3AED'
        },
        headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
          },
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "TONTINE_CONNECT",
          headerRight: ({}) => (
            <Ionicons
              name="notifications"
              size={30}
              className="mr-2"
              color="white"
            />
          ),
          drawerItemStyle:{
            borderRadius:0,
            borderBottomWidth:3,
            borderBottomColor:'#6d28d9',
            paddingVertical:15,
            marginTop:40
          },
          drawerIcon:({color, size})=><Ionicons name="home" 
          color={color} size={size} />,
          drawerLabel:'Acceuil'
          
        }}
      />
      <Drawer.Screen name="user" options={{
        title:"Mon Profil",
        drawerIcon:({color, size})=><Ionicons name="person" 
        color={color} size={size} />
      }} />
      <Drawer.Screen name="parametre" options={{
        title:"Paramètre",
        drawerIcon:({color, size})=><Ionicons name="settings" 
        color={color} size={size} />
      }} />
      <Drawer.Screen name="deconnexion" options={{
        title:"DECONNEXION",
        drawerItemStyle:{
          borderRadius:10,
          borderBottomWidth:0,
          marginVertical:20,
          backgroundColor: "#6d28d9",
        },
        drawerLabelStyle:{
          color:'white',
          textAlign:'center'
        }
      }} />
      
      
    </Drawer>
  );
};

export default _layout;
