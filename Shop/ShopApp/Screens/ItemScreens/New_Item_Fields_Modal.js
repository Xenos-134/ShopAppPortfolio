//3rd modal
import React, { useEffect, useState } from "react";
import { 
    Modal, 
    View, 
    Text, 
    FlatList, 
    Dimensions, 
    StyleSheet, 
    TextInput, 
    Button, 
    Pressable, 
    Alert
} from "react-native";

import {COLORS} from "../../Components/Colors/colors"

const SCREEN = Dimensions.get("window")



export const NewItemFieldsModal = ({title, setFM, open, fields}) => {
    const [isLoaded, setLoaded] = useState(false)
    const [modalFlag, setMF] = useState(false)
    const [modalList, setML] = useState(null) //Lista de ...
    const [selectorTitle, setItem] = useState(null) // Title of the selector
    const [selector, setSelector] = useState(null) //item escolhido pelo selector
    const [nif, setNIF] = useState(null) //Set New Item Fields
    const [txt, setText] = useState("") //TextInputHolder Used For Strings
    const [flag, setF] = useState(true)

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
        var sel;
        if(!flag){
            return(
                <View>
                    <Text>UPDATING</Text>
                </View>
            )
        }

        const x = nif.find(elm => elm.title === item.title)
        sel = x.value

        switch(item.type){
            case "String":
                return(
                    <View style={{alignItems: "center"}}>
                        <TextInput 
                            key={item}
                            onEndEditing={(e) => {addSelectedTextField(item.title, e.nativeEvent.text)}} //nao podemos usar onChangeText pois isso faz reload de todo flatList
                            placeholder={item.title}
                            style={styles.fields} 
                        />
                    </View>  
                )
            case "Number":
                    return(
                        <View style={{alignItems: "center"}}>
                            <TextInput 
                                onEndEditing={(e) => {addSelectedTextField(item.title, e.nativeEvent.text)}} //nao podemos usar onChangeText pois isso faz reload de todo flatList
                                placeholder={item.title} 
                                keyboardType="phone-pad" 
                                style={styles.fields} 
                            />
                        </View>  
                    )
            case "Selector":
                return(
                    <View 
                        key={item.title}
                        style={{alignItems: "center"}}>
                        <Pressable onPress={()=>getSelectorElements(item)} style={styles.fields}>
                            <Text>{sel?sel:item.title}</Text>
                        </Pressable>  
                    </View>
                )
            default:
                return(
                    <View style={{alignItems:"center"}}>
                        <View style={[styles.fields]}>
                            <Text>{item.title}</Text>
                        </View>  
                    </View>
                )
        }
    }

    //Function that adds selected value for the selector
    function addSelectedField(){
        for(elm in nif){
            if(nif[elm].title === selectorTitle){
                nif[elm].value = selector
                setNIF(nif)
                setF(true)
            }
        }
        
    }

    //Function that adds text of the selected field
    async function addSelectedTextField(itemT, text){
        for(elm in nif){
            if(nif[elm].title === itemT){
                nif[elm].value = text
            }
        }
    }


    async  function submitHandler(){
        presubmitValidation(nif)
        //console.log("LISTA QUE QUEREMOS SUBMETER\n", nif)
    }

    async function presubmitValidation(new_item){//Temporary function that verifies fields before submiting
        console.log()
        for await (field of new_item){
            if(!field.value){
                Alert.alert(`${field.title} isnt filled`, "Please fill ALL fields before submiting", [{text: "Ok", onPress:()=>console.log("-")}])
                return false
            }
        }
        return true
    }

    //render of field for some selector of new Item
    const renderFieldListItem = ({item}) => {
        return(
            <View style={{alignItems:"center"}}>
                <Pressable
                    onPress={()=>{setMF(false); setSelector(item); setF(false)}} 
                    style={[styles.fields]}>
                        <Text>{item}</Text> 
                </Pressable>
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
                //data={fields}
                data={nif}
                style={styles.newItemFields}
                keyExtractor={item=>item.title}
                renderItem={renderFields}
                removeClippedSubviews={false}
            />
            <View style={{alignItems:"center", position:"absolute", width:SCREEN.width, top: SCREEN.height*0.87}}>
                        <Pressable
                            onPress={submitHandler}
                        style={{
                            backgroundColor:COLORS.green,
                            width: SCREEN.width*0.95,
                            height: SCREEN.height*0.07,
                            borderRadius: SCREEN.height*0.035,
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                        >
                            <Text style={{color:"white"}}>Submit</Text>
                        </Pressable>
            </View>
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
        marginBottom: "2%", 
        height: SCREEN.height*0.07,  
        justifyContent:"center", 
        width:SCREEN.width*0.95,
        borderBottomColor: "black",
        borderBottomWidth: 0.8,
        borderBottomColor: "grey",
    },
    string_input:{
        borderBottomWidth: 1, 
        width: SCREEN.width*0.95
    },
    newItemFields:{
        position:"absolute", 
        width:SCREEN.width, 
        height: SCREEN.height, 
        backgroundColor:"white",

    }
})

const CarModels =  {
    AlfaRomeo: ["A_R Brand"],
    BMW: ["e36"],
    Seat: ["Seat Brand"],
    Audi: ["A5", "A3", "Qautro"],
    Toyota: ["Toyota Brand"],
}
