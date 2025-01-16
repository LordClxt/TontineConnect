import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet"

interface RechargerRef {
    open:()=>void
}

const BottomSheetRecharger = () => {

    const recharcherRef = useRef<BottomSheet>(null)
    const snapPoints = ["40%"]
    return (
        <BottomSheet
            snapPoints={snapPoints}
            ref={recharcherRef}
            enablePanDownToClose={true}
        >
            <BottomSheetView>
                <View>
                    <Text>BottomSheetRecharger</Text>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetRecharger