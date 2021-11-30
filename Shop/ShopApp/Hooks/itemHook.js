//function to create and manipulate items
import React from "react"


export const itemHook = () =>{
    async function newItem(){
        console.log("We are trying to create new Item")
    }

    return {
        newItem,
    }
}