import React from "react";
import { Image, Modal, Text, View } from "react-native";
const ModalSucces = ({ isVisible, message }: { isVisible: boolean, message:string }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View className="flex-1 justify-center items-center  bg-black/50">
        <View className="bg-white px-7 py-10 gap-3 rounded-lg items-center">
          <Image source={require("@/assets/images/succes.png")} />
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-center text-lg uppercase"
          >
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSucces;
