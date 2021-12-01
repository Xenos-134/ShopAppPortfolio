import React, { useEffect, useState } from "react";
import { Modal, View, Text, FlatList, Dimensions, StyleSheet } from "react-native";

const SCREEN = Dimensions.get("window")

export const NewItemFieldsModal = ({title, setFM, open, fields}) => {
    const [isLoaded, setLoaded] = useState(false)

    useEffect(()=>{
        console.log("Nossos fields ", fields)
        if(fields && fields.length) setLoaded(true)
    },[fields])

    function renderFields({item}){
        return(
            <Field item={item}/>
        )
    }

    const Field = ({item}) => {
        return(
            <View style={styles.fields}>
                <Text>{item.title}</Text>
            </View>  
        )
    }


    if(!isLoaded)return(
        <Modal
            animationType="slide"
            visible={open}
            transparent={true}
            onRequestClose={()=>setFM(false)}
            >
                <View style={{flex: 1, backgroundColor: "white", alignItems:"center", justifyContent:"center"}}>
                    <Text>Nao ha nada</Text>
                </View>
        </Modal>
    )
    
    return(
        <Modal
        animationType="slide"
        visible={open}
        transparent={true}
        onRequestClose={()=>{setFM(false); setLoaded(false);}}
        >
         
            <FlatList
                style={{top:"12%"}}
                data={fields}
                style={{position:"absolute", width:SCREEN.width, height: SCREEN.height, backgroundColor:"white"}}
                keyExtractor={item=>item.title}
                renderItem={renderFields}
            />
        </Modal> 
    )
}


const styles = StyleSheet.create({
    fields: {
        backgroundColor: "white", 
        alignItems:"center", 
        justifyContent:"center",
        height: SCREEN.height*0.08,
        alignItems: "flex-start",
        paddingLeft: SCREEN.width*0.1
    }
})