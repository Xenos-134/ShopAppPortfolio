import React, {useContext, useEffect, useState} from "react";
import { Button, Text } from "react-native";
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { useFetch } from "../Hooks/fetchHook";
import axios from "axios"
import {AuthContext} from "../Context/AuthContext"

export const Settings_Screen = () => {
    const fetch = useFetch()

    const auth = useContext(AuthContext)

    useEffect(()=>{
        console.log(auth)
    },[])

    async function sendToken(){
        axios.get("http://192.168.0.81:5000/auth",
            {
                headers: {Authorization: `Bearer ${auth.userToken}`}
        })
    }

    return(
        <Main_Screen_1>
            <Text> New Setttings Screen</Text>
            <Button
                title="Send"
                onPress={sendToken}
            />
            <Button 
                title="logOut"
                onPress={auth.logOut}
            />
        </Main_Screen_1>
    )
}