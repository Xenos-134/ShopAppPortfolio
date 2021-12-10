//New Modal To create new item without modal
import React from "react";
import { View, 
    Text, 
    ScrollView, 
    TextInput, 
    Dimensions, 
    StyleSheet, 
    Pressable,
    Modal 
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { Main_Screen_1 } from "../../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")

export const NewItemCarPage=()=>{
    const [new_car_schema, setNCS] = useState(null)
    const [text, setText] = useState("")
    useEffect(()=>{
        setNCS(newCarSchema) // use Function
    },[])


    function onSubmit(text){
        var ncs_copy = new_car_schema
        ncs_copy.Description = text
        setNCS(ncs_copy)
    }

    return(
        <Main_Screen_1>
            <ScrollView style={{flex:1}}>
                <Text>
                    Page to create enw item without modal
                </Text>
                <CustomTextInput onSubmit={onSubmit}/>
                <Pressable style={styles.fields} onPress={()=>{console.log(new_car_schema)}}/>
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={false}
            >
                <View style={{backgroundColor:"red", flex:1}}>
                    <Text>TEST MODAL</Text>
                </View>
            </Modal>
        </Main_Screen_1>
    )
}

const CustomTextInput = ({onSubmit}) => {
    return(
        <View>
            <TextInput style={styles.string_input} onChangeText={onSubmit}/>
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
        width: SCREEN.width*0.95
    },
})



//Temporary data just to test 
const CARS_FIELDS = { 
    title: 'Cars',
    fields: [
        {title: "Photos", type:"Image"},
        {title: "Brand", type: "Selector", list: [
            "AlfaRomeo",
            "BMW",
            "Audi",
            "Seat",
            "Toyota"
        ]},
        {title: "Model", type: "Selector"},
        {title: "Description", type:"String"},
        {title: "Year", type: "Date"},
        {title: "Version", type: "Number"},
    ]
  }



//Passar para detro de uma funcao
const newCarSchema = {
    iamges: [],
    Brand: null, //Selector
    Model: null, //Selector
    Description: "", //String
    Year: null, //Date

}