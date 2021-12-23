import React, {useState} from "react";
import { Button, Text } from "react-native";
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { useFetch } from "../Hooks/fetchHook";
import * as ImagePicker from "expo-image-picker"
import axios from "axios"

export const Settings_Screen = () => {
    const fetch = useFetch()
    const [image, setImage] = useState(null)    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        
        console.log(result);
        
        if (!result.cancelled) {
        setImage(result.uri);
        }

    };


    async function send(){
        const form = new FormData()
        await form.append("test", 
        {
            name:"test",
            type: "image/jpg",
            uri: image
        }
        )
        console.log(form)
        axios({
          method: "post",
          url: "http://192.168.0.81:5000/upload",
          data: form,
          headers: {
                    "Content-Type": "multipart/form-data",           
            },
        })
    }

    return(
        <Main_Screen_1>
            <Text> New Setttings Screen</Text>
            <Button
                title="Pick"
                onPress={pickImage}
            />

            <Button
                title="Send Image"
                onPress={send}
            />
            
        </Main_Screen_1>
    )
}