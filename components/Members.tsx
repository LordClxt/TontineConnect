import React from "react";
import { FlatList, Text, View } from "react-native";
// @ts-ignore
const Members = ({ membres }) => {
  
  return (
    <FlatList
      scrollEnabled={false}
      data={membres}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View
            className="mx-7 rounded border-2 border-neutral-300 overflow-hidden  p-7 bg-white"
            
          >
            <Text className="font-bold text-lg">
              {item.nom} {item.prenom}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default Members;
