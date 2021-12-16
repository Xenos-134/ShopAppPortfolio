import React from "react";
import { Button, Dimensions, StyleSheet, Text, View, Image, FlatList, Pressable } from "react-native";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {COLORS} from "../../Components/Colors/colors"
import { useEffect, useState } from "react/cjs/react.development";

const SCREEN = Dimensions.get("screen")

export const Notifications = ({navigation}) => {
    const [messages, setMessages] =  useState(null)

    useEffect(()=>{
        setMessages(MESSAGES)
    },[])


    //Function to mark this alert as marked and remove from flat list
    async function markAlerAsRead(title){
        //console.log("We want to filter ", title)
        const m_coppy = await messages.filter(elm => elm.title !== title)
        console.log("Our filtered list of messages is ", m_coppy)
        setMessages(m_coppy)
    }

    function renderNotification({item}){
        return(
            <MessageNotification 
                ff={markAlerAsRead}
                title={item.title} 
                body={item.body}
                image={`https://picsum.photos/500/500?${item.title}`}
                />
        )
    }

    //Change item.title -> key to unique id sent by server
    return(
        <Main_Screen_1>
            <FlatList
                data={messages}
                renderItem={renderNotification}
                keyExtractor={item => item.title}
            />
        </Main_Screen_1>
    )
}

//ff - filter function
const MessageNotification = ({title, body, image, ff}) =>{
    const lAction = () => {
        return(
            <Pressable 
                onPress={()=>ff(title)}
                style={
                    {backgroundColor: COLORS.orange, 
                    width: SCREEN.width*0.2, 
                    height:SCREEN.height*0.12}
                    }>
                <Text>test</Text>
            </Pressable>
        )
    }

    return(
        <Swipeable
            renderRightActions={lAction}
        >
            <View style={{width: SCREEN.width, alignItems:"center"}}> 
                <Pressable 
                    style={styles.message_not}
                    onPress={()=>console.log("We want ", title)}
                    >
                    <View style={styles.message_not_title}>
                        <Text style={{fontSize: 15, fontWeight: "700"}}>{title}</Text>
                    </View>
                    <View style={styles.message_not_body}>
                        <Text style={{color: "#595959"}}>{body}</Text>
                    </View>
                    <Image source={{uri: image}} 
                        style={styles.image}/>
                </Pressable>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    message_not:{
        width: SCREEN.width*0.95,
        height: SCREEN.height*0.12,
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginBottom: 5
    },
    message_not_title: {
        position:"absolute",
        //backgroundColor:"red",
        width: "75%",
        height: "30%",
        marginBottom: "2%"
    },
    message_not_body: {
        position:"absolute",
        //backgroundColor:"green",
        width: "75%",
        height: "65%",
        bottom: 0
    },
    image: {
        width: SCREEN.width*0.17, 
        height: SCREEN.width*0.17, 
        position: "absolute", 
        right: 0,
        borderRadius: SCREEN.width* 0.03,
        top: SCREEN.height*0.01
    }
})

const MESSAGES = [
    {title: "First Element", body: "Long Long Body to test This part", type:"alert"},
    {title: "Second Element", body: "Long Long Body to test This part", type:"alert"},
    {title: "Third Element", body: "Long Long Body to test This part", type:"alert"},
    {title: "Forth Element", body: "Long Long Body to test This part", type:"alert"},
    {title: "Last Element", body: "Long Long Body to test This part", type:"alert"},
]