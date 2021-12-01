import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";

export const NewItemFieldsModal = ({title, setFM, open, fields}) => {
    useEffect(()=>{
        console.log("Nossos fields ", fields)
    },[fields])

    return(
            <Modal
                animationType="slide"
                visible={open}
                transparent={true}
                onRequestClose={()=>setFM(false)}
                >
                    <View style={{flex: 1, backgroundColor: "white", alignItems:"center", justifyContent:"center"}}>
                        <Text>{title}</Text>
                    </View>
            </Modal>
    )
}