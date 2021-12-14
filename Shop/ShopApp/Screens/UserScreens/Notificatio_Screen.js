import React from "react";
import { Button, Dimensions, StyleSheet, Text, View, Image, FlatList, Pressable } from "react-native";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")

export const Notifications = ({navigation}) => {

    function renderNotification({item}){
        return(
            <MessageNotification 
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
                data={MESSAGES}
                renderItem={renderNotification}
                keyExtractor={item => item.title}
            />
        </Main_Screen_1>
    )
}


const MessageNotification = ({title, body, image}) =>{
    return(
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
    )
}

const styles = StyleSheet.create({
    message_not:{
        width: SCREEN.width*0.95,
        height: SCREEN.height*0.12,
        //backgroundColor: "blue",
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
    {title: "First Element", body: "Long Long Body to test This part"},
    {title: "Second Element", body: "Long Long Body to test This part"},
    {title: "Third Element", body: "Long Long Body to test This part"},
    {title: "Forth Element", body: "Long Long Body to test This part"},
    {title: "Last Element", body: "Long Long Body to test This part"},
]