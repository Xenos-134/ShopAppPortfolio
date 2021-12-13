//New Modal To create new item without modal
import React from "react";
import { View, 
    Text, 
    ScrollView, 
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Pressable,
    Modal,
    FlatList 
} from "react-native";

import { useEffect, useState } from "react/cjs/react.development";
import { COLORS } from "../../../Components/Colors/colors";
import { Main_Screen_1 } from "../../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")

export const NewItemCarPage=()=>{
    const [new_car_schema, setNCS] = useState(null)
    const [text, setText] = useState("")
    const [visible, setVisible] = useState(false)
    const [modalList, setML] = useState(null) //List that we use as data on the to render fields of the modal
    const [loaded, setLoaded] = useState(false)
    const [selector, setSelector] = useState("") //title of the selector that we are triying to update

    useEffect(()=>{
        setNCS(newCarSchema) // use Function
        setInitialBrandFields()
    },[])

    async function setInitialBrandFields(){
        const brands =  await Object.keys(CarSelectors.Brand)
        setML(brands) //Just temporary shit to test modal selector
    }


    //Function to update textfield of new_car_schema
    function updateTextField(text, field){
        var ncs_copy = new_car_schema
        ncs_copy[field] = text
        setNCS(ncs_copy)
    }

    //Function to render field of the modal for custom selector
    function renderModalSelector({item}){
        //Update field of the selector
        function update(brand){
            const ncs_copy = {...new_car_schema}
            ncs_copy[brand] = item
            setNCS(ncs_copy)
            setVisible(false)
        }
        return(
            <Pressable style={styles.fields} onPress={()=>update(selector)}>
                <Text>{item}</Text>
            </Pressable>
        )
    }

    //Function that will update the "visible" component used in the modal
    async function selectorPressHandler(name, title){
        setML(name)
        invalidateDependenciesFields(title)
        setSelector(title)
        setVisible(true)
    }

    //function to invalidate dependencies Fields
    async function invalidateDependenciesFields(field){
            var ncs_copy = {...new_car_schema}
            if(newCarSDependencies[field]) await newCarSDependencies[field].map(item=> ncs_copy[item]=null)
            console.log("Our new item ", ncs_copy)
            setNCS(ncs_copy)
            return
        }


    useEffect(()=>{
        if(new_car_schema) setLoaded(true)
    },[new_car_schema])

    if(!loaded){
        return(
            <Main_Screen_1>
                <Text>
                    Loading
                </Text>
            </Main_Screen_1>
        )
    }

    //Mf of the selector is function assigned to press of pressabel. In this context it updates the content of the modalList
    return(
        <Main_Screen_1>
            <ScrollView style={{flex:1}}>
                <Text>
                    Page to create enw item without modal
                </Text>
                <CustomTextInput title={"Description"} updateField={text=>updateTextField(text, "Description")}/>
                <CustomTextInput title={"Version"} updateField={text=>updateTextField(text, "Version")}/>
                <CustomSelector schema={new_car_schema} title={"Brand"} mf={async ()=>selectorPressHandler(await Object.keys(CarSelectors.Brand), "Brand")}/>
                <CustomSelectoWD schema={new_car_schema} title={"Model"} mf={async ()=>selectorPressHandler(CarSelectors.Brand[new_car_schema.Brand], "Model")} dep={true} tm={new_car_schema} td={"Brand"}/>
            </ScrollView>

            <Pressable style={styles.submit_btn} onPress={()=>console.log("Our Form >", new_car_schema)}>
                <Text style={{color:"white", fontWeight:"700", fontSize:16}}>Submit</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={()=>setVisible(false)}
            >
                <View style={{backgroundColor:"white", flex:1, alignItems:"center"}}>
                    <FlatList
                        data={modalList}
                        keyExtractor={item=> item}
                        renderItem={renderModalSelector}
                    />
                </View>
            </Modal>
        </Main_Screen_1>
    )
}

const CustomTextInput = ({updateField, title}) => {
    return(
        <View>
            <TextInput placeholder={title} style={styles.string_input} onChangeText={updateField}/>
        </View>
    )
}

//mf - modal function to open or close
const CustomSelector = ({title, mf, schema}) => {
    //console.log("Minha schema ", schema)
    return(
        <Pressable style={styles.fields} onPress={mf}>
            {
                schema[title]?(
                    <Text>
                        {schema[title]}
                    </Text>
                ):(
                    <Text>
                        {title}
                    </Text>
                )
            }
        </Pressable>
    )
}

//Custom Selector with dependencies
//tm is temporary modal_list/ td is record in the modal list that we want
const CustomSelectoWD = ({title, mf, dep, tm, td}) => {
    if(tm[td]){
        return(
            <Pressable style={styles.fields} onPress={mf}>
                {
                    tm[title]?(
                        <Text>
                            {tm[title]}
                        </Text>
                    ):(
                        <Text>
                            {title}
                        </Text>
                    )
                }
            </Pressable>
            )
        }
    return(
        <View style={styles.fields} onPress={mf}>
            <Text style={{color: "red"}}>
                Locked {title}
            </Text>
        </View>
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
        width: SCREEN.width*0.95,
        height: SCREEN.height*0.07,
        borderBottomWidth: 0.8,
        borderBottomColor: "grey",
    },
    submit_btn:{
        width: SCREEN.width*0.95, 
        position:"absolute", 
        bottom: SCREEN.width*0.15,
        height: SCREEN.height*0.07,
        backgroundColor:COLORS.green,
        borderRadius: SCREEN.height*0.035,
        alignItems:"center",
        justifyContent:"center",
        elevation: 5
        }
})



//Temporary data just to test 



//Passar para detro de uma funcao
const newCarSchema = {
    images: [],
    Brand: null, //Selector
    Model: null, //Selector
    Description: "", //String
    Version: "", //String
    Year: null, //Date
}

//dependencies of each field.  Then will put inside newCarSchema 
const newCarSDependencies = {
    images: null,
    Brand: ["Model"], //Selector
    Model: null, //Selector
    Description: null, //String
    Version: null, //String
    Year: null, //Date
}

const CarSelectors = {
    Brand: {
        "Audi": ["A5", "A6", "Quatro"], 
        "Ford": ["Focus", "Fiesta", "Mondeo"], 
        "BMW": ["M3", "M5"], 
        "Seat": ["Ibiza", "Balde Com Parafusos"],
        "Porshe": ["1s"]
    },
}