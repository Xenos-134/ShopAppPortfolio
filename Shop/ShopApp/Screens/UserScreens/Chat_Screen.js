//---------------------------------------------------------
//  Screen That Displays All Messages Of The User - For now just testing image upload
//---------------------------------------------------------

import React, {useState, useEffect} from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {View, Text, Button , Image, FlatList, Dimensions} from "react-native"
import * as ImagePicker from 'expo-image-picker';

import {COLORS} from "../../Components/Colors/colors"

const SCREEN = Dimensions.get("screen")


export const ChatScreen = () => {
    const myId = "12"


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
            />
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
]



// const [image, setImage] = useState(null);
//     useEffect(() => {
//         (async () => {
//           if (Platform.OS !== 'web') {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//               alert('Sorry, we need camera roll permissions to make this work!');
//             }
//           }
//         })();
//       }, []);


//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
    
//         console.log(result);
    
//         if (!result.cancelled) {
//           setImage(result.uri);
//         }
//       };

// <Button title="Pick an image from camera roll" onPress={pickImage} />
//                 {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}