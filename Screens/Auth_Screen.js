import React from "react";
import { View, StyleSheet, Text, Image, Button, ImageBackground } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";



//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import {COLORS} from "../Components/Colors/colors"
import { MainScreen } from "../Components/ScreenBackGround/Main_Screen_Component";


export const AuthScreen = () => {

    return(
        <MainScreen>
           <ImageBackground source = {require("../background.jpg")} style = {styles.main_screen}>
                 <Image source = {require("../pngegg.png")}
                    style = {{ width: 200 , height: 70, position:"absolute", top: "20%" }}
                />
                <View style={styles.login_button_box}>
                    <TouchableHighlight onPress={()=>console.log("LOGIN BUTTON")} style={styles.login_button} underlayColor="#1f7a1f">
                            <Text style={styles.button_text}>Login</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.register_button_box}>
                    <TouchableHighlight onPress={()=>console.log("SIGN UP BUTTON")} style={styles.register_button} underlayColor="#cc5200">
                            <Text style={styles.button_text}>Sign Up</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </MainScreen>
    )
}


const styles = StyleSheet.create({
    main_screen: {
        position:"absolute",
        width:'100%',
        height:"100%",
        alignItems: "center"
    },
    login_button_box:{
        flex:1, 
        position:"absolute", 
        width:"65%", height:"9%",
        bottom: "20%",
    },
    login_button:{
        backgroundColor:COLORS.green,
        width:"100%", height:"100%",alignItems:"center", justifyContent:"center",
        borderRadius: 100,
    },
    register_button_box:{
        flex:1, 
        position:"absolute", 
        width:"65%", height:"9%",
        bottom: "9%",
    },
    register_button:{
        backgroundColor:COLORS.orange,
        width:"100%", height:"100%",alignItems:"center", justifyContent:"center",
        borderRadius: 100,
    },
    button_text:{
        color: "white",
        fontFamily:'Roboto',
        fontWeight: "800",
        fontSize: 20,
        fontStyle: "italic"

    }

})