import React from "react";
import { View, StyleSheet } from "react-native";

export const Main_Screen_1 = ({children}) => {
    return(
        <View style={styles.screen}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        top: 35, //use Some shit to make margn on top
        alignItems: "center",
        justifyContent:"center",
        flex:1,
    }
})

