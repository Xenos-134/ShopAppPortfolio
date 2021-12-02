import React, { useEffect, useState } from "react";
import { Modal, View, Text, FlatList, Dimensions, StyleSheet, TextInput, Button, Pressable } from "react-native";

const SCREEN = Dimensions.get("window")

export const NewItemFieldsModal = ({title, setFM, open, fields}) => {
    const [isLoaded, setLoaded] = useState(false)
    const [modalFlag, setMF] = useState(false)
    const [modalList, setML] = useState(null) //Lista de ...
    const [selectorTitle, setItem] = useState(null) // Title of the selector
    const [selector, setSelector] = useState(null) //item escolhido pelo selector
    const [nif, setNIF] = useState(null) //Set New Item Fields

    useEffect(()=>{
        if(fields && fields.length){
            setLoaded(true)
            setNIF(fields)
        }
    },[fields])


    useEffect(()=>{
        addSelectedField()
    }, [selector])


    function renderFields({item}){
        return(
            <Field item={item}/>
        )
    }


    //Function that get list of  possibilities for certain type of fields
    async function getSelectorElements(item){
        setMF(true); 
        if(item.title==="Model"){ //Model Selector
            var x = await nif.find(elm => elm.title === "Brand")
            console.log("NOSSO ITEM" ,x.value)
            x.value?setML(CarModels[x.value]):setML(await getAllModels())
            
        }else{//Else Selector. For now its just brand Selector
            setML(item.list); 
        }
        setItem(item.title)
    }

    async function getAllModels(){
        var list = []
        const keys = Object.keys(CarModels)
        console.log("CHAVES ", keys)
        for(key in keys){
            list.push(...CarModels[keys[key]])
        }
        console.log("Lista", list)
        return list
    }

    const Field = ({item}) => {
        switch(item.type){
            case "String":
                return(
                    <View style={styles.fields}>
                        <TextInput placeholder={item.title} style={styles.string_input}/>
                    </View>  
                )
            case "Number":
                    return(
                        <View style={styles.fields}>
                            <TextInput placeholder={item.title} keyboardType="phone-pad" style={styles.string_input}/>
                        </View>  
                    )
            case "Selector":
                return(
                    <Pressable onPress={()=>getSelectorElements(item)} style={styles.fields}>
                        <Text>{item.title}</Text>
                    </Pressable>  
                )
            default:
                return(
                    <View style={styles.fields}>
                        <Text>{item.title}</Text>
                    </View>  
                )
        }
    }

    //Function that adds selected value for the selector
    function addSelectedField(){
        for(elm in nif){
            if(nif[elm].title === selectorTitle){
                nif[elm].value = selector
            }
        }
        //console.log(">>>>Nosso Nif", nif)
    }


    const renderFieldListItem = ({item}) => {
        return(
            <Pressable
                onPress={()=>{setMF(false); setSelector(item)}} 
                style={{width: SCREEN.width, height: SCREEN.height*0.07, marginBottom: 2, alignItems:"center"}}>
                <Text>{item}</Text> 
            </Pressable>
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
            <Modal
                animationType="slide"
                visible={modalFlag}
                transparent={true}
                onRequestClose={()=>setMF(false)}  
            >
                <FlatList
                    data={modalList}
                    style={{position:"absolute", width:SCREEN.width, height: SCREEN.height, backgroundColor:"white" ,paddingTop: SCREEN.height*0.1, }}
                    keyExtractor={item => item}
                    renderItem={renderFieldListItem}
                />
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
        paddingLeft: SCREEN.width*0.1,
        
    },
    string_input:{
        borderBottomWidth: 1, 
        width: SCREEN.width*0.8
    }
})

const CarModels =  {
    AlfaRomeo: ["A_R Brand"],
    BMW: ["e36"],
    Seat: ["A_R Brand"],
    Audi: ["A5", "A3", "Qautro"],
    Toyota: ["Toyota Brand"],
}
