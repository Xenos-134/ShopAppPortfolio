import React from "react";
import axios from "axios"
import {useContext} from "react"
const SERVER_ADDR = "http://192.168.0.81:5000"
import {AuthContext} from "../Context/AuthContext"


export const useFetch = () => {
    const auth = useContext(AuthContext)

    //Sends empty request to server
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

    //Send request to create new Car item
    async function newCar(form){
        try{
            //await axios.post(SERVER_ADDR+"/item/newCar", {form})
            await axios({
                method: "post",
                //url: SERVER_ADDR+"/item/newCar",
                url: SERVER_ADDR+"/item/newCar",
                data: form,
                headers: {
                    "Content-Type": "multipart/form-data", 
                     Authorization: `Bearer ${auth.userToken}` 
                }

            })
            return true
        }catch(e){
            throw new fetchException("Some error while creating new Car")
        }
    }

    //Gets All items that arent in users wish list
    async function getAllItems(){
        try{
            const response = await axios.post(SERVER_ADDR+"/item/all")
            return response.data.items
        }catch(e){
            console.log(e)
            throw new fetchException("Error while tring to get all items")
        }
    }


    //Sends request that user added that item to wish list
    async function addToWishList(itemID){
        console.log(itemID)
        try{
            const response = await axios.post(
                SERVER_ADDR+"/item/addToWishList",
                {itemID}, 
                {
                    headers: {
                         Authorization: `Bearer ${auth.userToken}` 
                        }
                    })
        }catch(e){

        }
    }

    //Gets user wish list items
    async function getWLItems(){
        try{
            const response = await axios.get(SERVER_ADDR+"/item/wlItems",
            {
                headers: {
                    Authorization: `Bearer ${auth.userToken}` 
                   }
               }    
            )
            return response.data
        }catch(e){

        }
    }


    //I dont know why i put the auth part here. Prob were drunk.
    async function getElement(id){
        try{
            const response = await axios.get(SERVER_ADDR+`/item/getItem/${id}`, {
                headers: {Authorization: `Bearer ${auth.userToken}`}
            })
            return response.data
        }catch(e){}
    }



    async function getUserChatRooms(){
        try{
            const response = await axios.get(SERVER_ADDR+`/chat`, {
                headers: {Authorization: `Bearer ${auth.userToken}`}
            })
            return response.data.userCRooms
        }catch(e){
        }
    }

    async function sendSocket(socket){
        console.log("tests")
        try{
            const jsocket = await JSON.stringify(socket)
            const response = await axios.post(SERVER_ADDR+`/setSocket`,{jsocket}, {
                headers: {Authorization: `Bearer ${auth.userToken}`}
            })
            return response.data.userCRooms
        }catch(e){
            console.log("ERROR ",e)
        }
    }

    async function chatWithOwner(){
        try{
            const response = await axios.get(SERVER_ADDR+`/chat/chatWithOwner`, {
                headers: {Authorization: `Bearer ${auth.userToken}`}
            })
            return response.data
        }catch(e){
            console.log("ERROR ",e)
        }
    }

    async function getChatRoom(id){
        console.log(".............")
        try{
            const response = await axios.get(SERVER_ADDR+`/chat/getChatRoom/${id}`, {
                headers: {Authorization: `Bearer ${auth.userToken}`}
            })
            return response.data
        }catch(e){
        }
    }


    return {
        ping,
        signUp,
        logIn,
        newCar,
        getAllItems,
        addToWishList,
        getWLItems,
        getElement,
        getUserChatRooms,
        sendSocket,
        chatWithOwner,
        getChatRoom,
    }
}

function fetchException(message){
    this.message = message
    this.name = "fetchException"
}