import React, { useEffect, useState, useRef, useContext } from "react"
import { 
    View, 
    StyleSheet, 
    Text, 
    Image, 
    Button, 
    ImageBackground, 
    TextInput, 
    Dimensions,
    Keyboard, 
    Animated,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";


//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import {COLORS} from "../Components/Colors/colors"
import { MainScreen } from "../Components/ScreenBackGround/Main_Screen_Component";
import { useFetch } from "../Hooks/fetchHook";


const WINDOW = Dimensions.get("window")

export const SignUp = () => {
    const [ks, setKS] = useState(false)
    const [input, setInput] = useState({username:"", password: ""})
    const [ei, setEI] = useState({activated: false, width: WINDOW.width*0.8, height: WINDOW.height*0.08})
    var ef = useRef({width: new Animated.Value(WINDOW.width*0.8), height: new Animated.Value(WINDOW.height*0.08)}).current //for Email Field
    var pf = useRef({width: new Animated.Value(WINDOW.width*0.8), height: new Animated.Value(WINDOW.height*0.08)}).current //for Password Field

    const fetch = useFetch()

    useEffect(()=>{
        const keybardDidShowListener = Keyboard.addListener("keyboardDidShow",()=> setKS(true))
        const keybardDidHideListener = Keyboard.addListener("keyboardDidHide",()=> setKS(false))
        const keybardDidHideListenerWidth = Keyboard.addListener("keyboardDidHide", hoverOut)
        return(()=>{
            keybardDidHideListener.remove()
            keybardDidShowListener.remove()
            keybardDidHideListenerWidth.remove()
        })
    },[])



    function hoverInEI(){ //Function that gives perception of hoverIn for email
            Animated.timing(ef.width, {
                toValue: WINDOW.width*0.9,
                duration: 200,
                useNativeDriver: false
            }).start()
            Animated.timing(ef.height, {
                toValue: WINDOW.height*0.09,
                duration: 300,
                useNativeDriver: false
            }).start()
    }

    function hoverInPI(){ //Function that gives perception of hover
        Animated.timing(pf.width, {
            toValue: WINDOW.width*0.9,
            duration: 300,
            useNativeDriver: false
        }).start()
        Animated.timing(pf.height, {
            toValue: WINDOW.height*0.09,
            duration: 300,
            useNativeDriver: false
        }).start()
}


    function hoverOut(){ //Function that gives perception of hoverOut
        Animated.timing(ef.width, {
            toValue: WINDOW.width*0.8,
            duration: 500,
            useNativeDriver: false
        }).start()

        Animated.timing(ef.height, {
            toValue: WINDOW.height*0.08,
            duration: 300,
            useNativeDriver: false
        }).start()

        //for password field. Didnt wanted to add unncessary functions
        Animated.timing(pf.width, {
            toValue: WINDOW.width*0.8,
            duration: 500,
            useNativeDriver: false
        }).start()

        Animated.timing(pf.height, {
            toValue: WINDOW.height*0.08,
            duration: 300,
            useNativeDriver: false
        }).start()
}

    async function buttonPressHandler(){
        try{
            await fetch.signUp(input.username, input.password)
            console.log("Success")
        }catch(e){
            console.log("Catched error: ", e)
        }
    }

    return(
        <MainScreen>
            <ImageBackground source = {require("../background.jpg")} style = {styles.main_screen}>
                 <Image source = {require("../pngegg.png")}
                    style = {{ width: 200 , height: 70, position:"absolute", top: WINDOW.height*0.15 }}
                />
                <Animated.View style={[styles.username_input, {width: ef.width, height: ef.height}]}>
                    <TextInput
                        style={{flex:1}}
                        onChangeText={(text)=>setInput({...input, username: text})}
                        placeholder="Username"
                        value={input.username}
                        textAlign="center"
                        onFocus={hoverInEI}
                        onEndEditing={hoverOut}
                    />
                </Animated.View>
                <Animated.View style={[styles.password_input, {width: pf.width, height: pf.height}]}>
                    <TextInput
                        style={{flex:1}}
                        onChangeText={(text)=>setInput({...input, password: text})}
                        value={input.password}
                        textAlign="center"
                        placeholder="Password"
                        onFocus={hoverInPI}
                        onEndEditing={hoverOut} 
                        secureTextEntry
                    />
                </Animated.View>
                {!ks &&                 
                    <View style={styles.register_button_box}>
                        <TouchableHighlight onPress={buttonPressHandler} style={styles.register_button} underlayColor="#cc5200">
                                <Text style={styles.button_text}>Submit</Text>
                        </TouchableHighlight>
                    </View>
                }
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
    register_button_box:{
        flex:1, 
        position:"absolute", 
        width:"60%", height:WINDOW.height*0.09 ,
        bottom: WINDOW.height*0.09,
    },
    register_button:{
        backgroundColor:COLORS.orange,
        width:"100%", height:"100%",alignItems:"center", justifyContent:"center",
        borderRadius: 100,
    },
    button_text:{
        color: "white",
        fontFamily:'Roboto',
        fontSize: 20,
        fontStyle: "italic"
    },
    username_input:{
        backgroundColor:"white", 
        position:"absolute",
        width:"80%",
        height: WINDOW.height*0.08, 
        top: WINDOW.height*0.30,
        borderRadius: WINDOW.height*0.04
    },
    password_input:{
        backgroundColor:"white", 
        position:"absolute",
        width:"80%",
        height: WINDOW.height*0.08, 
        top: WINDOW.height*0.40,
        borderRadius: WINDOW.height*0.04
    }

})