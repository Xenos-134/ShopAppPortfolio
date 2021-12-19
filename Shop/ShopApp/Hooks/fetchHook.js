import React from "react";
import axios from "axios"

const SERVER_ADDR = "http://192.168.1.69:5000"

export const useFetch = () => {

    async function ping(message){
        const response = await axios.get(SERVER_ADDR)
        return response
    }

    async function signUp(username, password){
        //const response = await axios.post(SERVER_ADDR+"/auth/signUp", {username, password})
        axios.post(SERVER_ADDR+"/auth/signUp", {username, password})
    }

    return {
        ping,
        signUp,
    }
}