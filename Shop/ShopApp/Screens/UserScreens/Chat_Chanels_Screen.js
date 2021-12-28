import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {COLORS} from "../../Components/Colors/colors"
import { useFetch } from "../../Hooks/fetchHook";


const SCREEN = Dimensions.get("screen")

export const Chat_Chanels = ({navigation, route}) =>{
    const [chatRooms, setChatRooms] = useState([])
    const fetch = useFetch()

    useEffect(()=>{
        //setChatRooms(chatChanels)
        getUserChatRooms()
    }, [])

    async function getUserChatRooms(){
        const ucr = await fetch.getUserChatRooms()
        setChatRooms([...ucr, ...chatChanels])
        //console.log(ucr)
    }


    const ChatChanelView = ({item}) => {
        return(
            <Pressable 
                style={styles.chat_chanel_view} 
                onPress={()=>navigation.navigate("Private_Chat")}>

                <Image
                    source={{uri: `https://picsum.photos/100/101${item.id[0] || item.id}`}}
                    style={{
                        width: SCREEN.width*0.13, 
                        height: SCREEN.width*0.13,
                        borderRadius: SCREEN.width*0.065,
                        marginRight: 12
                    }}
                    resizeMethod="auto"
                />

                <View style={{
                        position:"absolute",
                        left: SCREEN.width*0.75, 
                    }}>
                        {item.n_unread>0 && 
                            <View style={{
                            
                                
                                backgroundColor: COLORS.green,
                                width: SCREEN.width*0.05,
                                height: SCREEN.width*0.05,
                                alignItems:"center",
                                justifyContent:"center",
                                borderRadius: SCREEN.width*0.025
                                }}>
                                <Text style={{color: "white"}}>{item.n_unread}</Text>
                            </View>
                        }
                </View>


                <View>
                    <Text style={{fontSize: 16, fontWeight: "700"}}>
                        {item.chatPartnerName} 
                    </Text>
                    <Text style={{fontSize: 14}}>
                        {item.messages[item.messages.length-1].text}
                    </Text>
                </View>
            </Pressable>
        )
    }

   return(
       <Main_Screen_1>
           <FlatList
                data={chatRooms}
                renderItem={ChatChanelView}
                keyExtractor={item=>item.id}
           />
       </Main_Screen_1>
   ) 
}

const messages1 = [
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


const chatChanels = [
    {id: 1, senderId: 123, chatPartnerId: 123, chatPartnerName: "John", messages:  messages1, n_unread: 2 },
    {id: 2, senderId: 123, chatPartnerId: 123, chatPartnerName: "Thomas", messages: messages1, n_unread: 3 },
    {id: 3, senderId: 123, chatPartnerId: 123, chatPartnerName: "Andrew", messages: messages1, n_unread: 0 },
]


const styles = StyleSheet.create({
    chat_chanel_view:{
        flexDirection: "row",
        height: SCREEN.height*0.1,
        width: SCREEN.width*0.85,
        alignItems:"center",
        marginBottom: 3,
        borderBottomWidth: 0.8,
        borderColor: "grey" 
        },
})