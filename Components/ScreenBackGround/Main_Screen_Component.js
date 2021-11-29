//---------------------------------------------------------------------
//      Component Used For Main Screen (colors, position, etc...)
//---------------------------------------------------------------------

import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";


//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import {COLORS} from "../Colors/colors"


export const MainScreen = ({children}) => {
    return(
        <SafeAreaView style={styles.main_screen}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main_screen:{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        position:"absolute"
        
    }
})
