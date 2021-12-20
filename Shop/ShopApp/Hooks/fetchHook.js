import React from "react";
import axios from "axios"

const SERVER_ADDR = "http://192.168.1.69:5000"

export const useFetch = () => {

    async function ping(message){
        const response = await axios.get(SERVER_ADDR)
        return response
    }


    //Sign Up sender function
    async function signUp(username, password){
        const response = await axios.post(SERVER_ADDR+"/auth/signUp", {username, password})
        if(response.status !== 200) throw new fetchException("Some Error On Server Side")
        return
    }

    async function logIn(username, password){
        const response = await axios.post(SERVER_ADDR+"/auth/logIn", {username, password})
        if(response.status !== 200) throw new fetchException("Some Error On Server Side")
        return response.data.userToken
    }

    return {
        ping,
        signUp,
        logIn
    }
}

function fetchException(message){
    this.message = message
    this.name = "fetchException"
}