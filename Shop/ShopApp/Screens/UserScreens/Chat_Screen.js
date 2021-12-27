//---------------------------------------------------------
//  Screen That Displays All Messages Of The User - For now just testing image upload
//---------------------------------------------------------

import React, {useState, useEffect} from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {View, Text, Button , Image, FlatList, Dimensions, TextInput, Keyboard, Pressable} from "react-native"
import * as ImagePicker from 'expo-image-picker';

import {COLORS} from "../../Components/Colors/colors"
import { useContext } from "react/cjs/react.development";
import { OpenContext } from "../../Context/AuxContext";
import { AuthContext } from "../../Context/AuthContext";

const SCREEN = Dimensions.get("screen")


export const ChatScreen = () => {
    const myId = "12"
    const auxContext = useContext(OpenContext)
    const [message, setMessage] = useState("")

    const auth = useContext(AuthContext)

    useEffect(()=>{
        const keybardDidShowListener = Keyboard.addListener("keyboardDidShow",()=> auxContext.sok(true))
        const keybardDidHideListener = Keyboard.addListener("keyboardDidHide",()=> auxContext.sok(false))
    
        return(()=>{
            keybardDidHideListener.remove()
            keybardDidShowListener.remove()
          
        })
    },[])

    function sendMessage(){
        console.log(">>",message)
        auth.socket.emit("client", {message})
        setMessage("")
    }


    function renderMessage({item}){
       if(item.senderId===myId){
        return(
            <View style={{
                backgroundColor: "white",
                elevation:1.5,
                width: SCREEN.width*0.7,
                minHeight: SCREEN.height*0.07,
                padding: SCREEN.height*0.02,
                justifyContent: "center",
                marginBottom: SCREEN.height*0.02,
                borderRadius: SCREEN.height*0.02,
                borderTopStartRadius: SCREEN.height*0.005,
                left: SCREEN.width*0.05
                }}>
                <Text>
                    {item.text}
                </Text>
            </View>
        )
       }
       return(
        <View style={{
            backgroundColor: COLORS.green,
            elevation:1.5,
            width: SCREEN.width*0.7,
            minHeight: SCREEN.height*0.07,
            padding: SCREEN.height*0.02,
            justifyContent: "center",
            marginBottom: SCREEN.height*0.02,
            left: SCREEN.width*0.25,
            marginBottom: SCREEN.height*0.02,
            borderRadius: SCREEN.height*0.02,
            borderTopEndRadius: SCREEN.height*0.005,
            }}>
            <Text style={{color: "white"}}>
                {item.text}
            </Text>
        </View>
    )
       
    }


    return(
        <Main_Screen_1>
            <FlatList
                style={{width: SCREEN.width,}}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item=>item.id}
                initialScrollIndex={messages.length - 1}
                ListFooterComponent={()=><View style={{height: SCREEN.height*0.2}}/>}
            />
            <TextInput
                style={{width:SCREEN.width*0.8, 
                        height: SCREEN.height*0.07,
                        left:SCREEN.width*0.02,  
                        position: "absolute", 
                        bottom: 50, 
                        backgroundColor:"#ccffcc", 
                        borderRadius: SCREEN.height*0.035, 
                        paddingHorizontal: SCREEN.width*0.05,
                        borderWidth: 1,
                        borderColor: "#009933"
                    }}
                onChangeText={(text)=>setMessage(text)}
                placeholder="Your Message"
                value={message}
            />
            <Pressable 
                onPress={sendMessage}
                style={{
                    height: SCREEN.height*0.07,
                    width:SCREEN.width*0.12,
                    borderRadius: SCREEN.height*0.035,
                    backgroundColor:"#009933", 
                    position: "absolute", 
                    bottom: 50, 
                    right: 10,
                    alignItems:"center",
                    justifyContent:"center",
                    elevation:5
                    }}>
                <Text>+</Text>
            </Pressable>
        </Main_Screen_1>
    )
}


const messages = [
    {text: "hello", senderName: "John", senderId: "12", id: "1"},
    {text: "hi", senderName: "John", senderId: "1234", id: "2"},
    {text: "how is ur day", senderName: "John", senderId: "12", id: "3"},
    {text: "good. And ur?", senderName: "John", senderId: "1234", id: "4"},
    {text: "Also Good. Im contacting you to because of your last publication. Is it till avaliable", senderName: "John", senderId: "12", id: "5"},
    {text: "Yes of Course. Is the price same?", senderName: "John", senderId: "123", id: "6"},
    {text: "If yes whe are u free?", senderName: "John", senderId: "123", id: "7"},
    {text: "When?", senderName: "John", senderId: "12", id: "8"},
    {text: "Final Message", senderName: "John", senderId: "12", id: "9"},
]

