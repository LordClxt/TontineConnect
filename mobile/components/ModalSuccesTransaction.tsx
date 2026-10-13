import React from "react";
import { Modal, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import T from "./ui/T";
import { colors } from "@/constants/theme";

const ModalSucces = ({ isVisible, message }: { isVisible: boolean; message: string }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View className="flex-1 justify-center items-center bg-ink/50 px-10">
        <View className="bg-white w-full px-7 py-9 gap-4 rounded-3xl items-center">
          <View className="w-16 h-16 rounded-full bg-tint items-center justify-center">
            <Ionicons name="checkmark" size={34} color={colors.brandDeep} />
          </View>
          <T variant="heading" className="text-center">
            {message}
          </T>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSucces;
