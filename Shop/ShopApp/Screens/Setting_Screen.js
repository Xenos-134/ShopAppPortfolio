import React from "react";
import { Button, Text } from "react-native";
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { useFetch } from "../Hooks/fetchHook";

export const Settings_Screen = () => {
    const fetch = useFetch()    


    async function sendPing(){
        const response = await fetch.signUp("xenos", 134)
        console.log("response >> ", response.data)
    }

    return(
        <Main_Screen_1>
            <Text> New Setttings Screen</Text>
            <Button
                title="Send Ping"
                onPress={sendPing}
            />
        </Main_Screen_1>
    )
}