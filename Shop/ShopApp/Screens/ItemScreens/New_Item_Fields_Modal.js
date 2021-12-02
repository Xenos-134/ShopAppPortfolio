import React, { useEffect, useState } from "react";
import { Modal, View, Text, FlatList, Dimensions, StyleSheet, TextInput, Button } from "react-native";

const SCREEN = Dimensions.get("window")

export const NewItemFieldsModal = ({title, setFM, open, fields}) => {
    const [isLoaded, setLoaded] = useState(false)
    const [modalFlag, setMF] = useState(false)
    const [modalInfo, setMInfo] = useState(null) 

    useEffect(()=>{
        if(fields && fields.length) setLoaded(true)
    },[fields])

    function renderFields({item}){
        return(
            <Field item={item}/>
        )
    }

    const Field = ({item}) => {
        switch(item.type){
            case "String":
                return(
                    <View style={styles.fields}>
                        <TextInput placeholder={item.title} style={styles.string_input}/>
                        <Button title="+" onPress={()=>setMF(true)}/>
                    </View>  
                )
            case "Number":
                    return(
                        <View style={styles.fields}>
                            <TextInput placeholder={item.title} keyboardType="phone-pad" style={styles.string_input}/>
                        </View>  
                    )
            default:
                return(
                    <View style={styles.fields}>
                        <Text>{item.title}</Text>
                    </View>  
                )
        }
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
                <Modal
                    animationType="slide"
                    visible={modalFlag}
                    transparent={true}
                    onRequestClose={()=>setMF(false)}  
                >
                    <View style={{ width:SCREEN.width, height: SCREEN.height, position: "absolute", backgroundColor: 'red'}}>
                        <Text>New Modal Shit</Text>
                    </View>
                </Modal>
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
    },
    string_input:{
        borderBottomWidth: 1, 
        width: SCREEN.width*0.7
    }
})