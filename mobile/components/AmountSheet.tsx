import { View, Pressable, TextInput } from "react-native";
import React, { forwardRef, useCallback, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import T from "./ui/T";
import PrimaryButton from "./ui/PrimaryButton";
import { colors, fonts } from "@/constants/theme";

export interface AmountSheetValues {
  numero: string;
  montant: string;
}

interface AmountSheetProps {
  title: string;
  description: string;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: AmountSheetValues) => void;
  onClose: () => void;
}

// BottomSheetTextInput est incompatible avec NativeWind (qui enveloppe TextInput) : TextInput simple + style inline
const fieldStyle = {
  height: 56,
  borderRadius: 16,
  paddingHorizontal: 16,
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.line,
  color: colors.ink,
  fontFamily: fonts.regular,
  fontSize: 15,
};

// Feuille commune pour recharger / retirer / épargner
const AmountSheet = forwardRef<BottomSheet, AmountSheetProps>(
  ({ title, description, submitLabel, loading, onSubmit, onClose }, ref) => {
    const [numero, setNumero] = useState("");
    const [montant, setMontant] = useState("");

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
      ),
      []
    );

    const submit = () => {
      onSubmit({ numero, montant });
      setNumero("");
      setMontant("");
    };

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        enablePanDownToClose
        enableDynamicSizing
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.line, width: 44 }}
        backgroundStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        <BottomSheetView className="px-6 pb-12 pt-2">
          <View className="flex-row items-start mb-6">
            <View className="flex-1 gap-1">
              <T variant="title">{title}</T>
              <T variant="body" className="text-muted">
                {description}
              </T>
            </View>
            <Pressable
              onPress={onClose}
              accessibilityLabel="Fermer"
              hitSlop={12}
              className="w-9 h-9 rounded-full bg-mist items-center justify-center"
            >
              <Ionicons name="close" size={20} color={colors.ink} />
            </Pressable>
          </View>

          <View className="gap-1.5 mb-4">
            <T variant="label">Numéro Mobile Money</T>
            <TextInput
              keyboardType="phone-pad"
              value={numero}
              onChangeText={setNumero}
              placeholder="07 00 00 00 00"
              placeholderTextColor="#A59CBF"
              style={fieldStyle}
            />
          </View>
          <View className="gap-1.5 mb-6">
            <T variant="label">Montant</T>
            <View className="flex-row items-center h-16 rounded-2xl px-4 bg-mist">
              <TextInput
                keyboardType="number-pad"
                value={montant}
                onChangeText={setMontant}
                placeholder="0"
                placeholderTextColor="#A59CBF"
                style={{ flex: 1, color: colors.ink, fontFamily: fonts.bold, fontSize: 24 }}
              />
              <T variant="label" className="text-muted">
                FCFA
              </T>
            </View>
          </View>

          <PrimaryButton
            className="w-full"
            loading={loading}
            disabled={!numero || !montant}
            onPress={submit}
          >
            {submitLabel}
          </PrimaryButton>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default AmountSheet;
