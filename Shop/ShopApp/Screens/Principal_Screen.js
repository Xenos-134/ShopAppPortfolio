import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Button, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { ItemCard } from "../Components/ItemComponents/ItemCard";
import { NewItemModal } from "./ItemScreens/New_Item_Modal";

const SCREEN = Dimensions.get("window")


export const PrincipalScreen = ({navigation}) => {
    const [modalVisible, setMV] = useState(false)

    return(
        <Main_Screen_1>
            <View style={{flexDirection: "row"}}>
                <ItemCard itemData={{title: "Text That should overflow", price: "12"}} />
                <ItemCard itemData={{title: "SMALL TITLE FOR MY NEW ELEMENT. HELLO WORLD", price: "23"}}/>
            </View>
            <Button
                title="New Item"
                onPress={()=>setMV(!modalVisible)}
            />
            <NewItemModal modalVisible={modalVisible} setMV={setMV}/>
        </Main_Screen_1>
    )
}


const styles = StyleSheet.create({
    product:{
        backgroundColor:"white",
        width: SCREEN.width*0.45,
        height: SCREEN.height*0.4,
        borderRadius: (SCREEN.width*0.45)*0.1,
        margin: 4,
        overflow: "hidden",
        elevation: 10
    },
    product_image:{
        backgroundColor: "red",
        height: "61.8%"
    },
    product_price_box:{
        marginLeft: "9%",
        marginRight:"9%",
        marginVertical:"5%",
        flexDirection: "row",
    },
    product_price_text:{
        fontSize: 20,
        fontWeight: "700"
    },
    product_title_box:{
        flex: 1,
        marginBottom: "5%",
        marginHorizontal: "5%"
    },
    product_title_text: {
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Roboto",
        fontStyle:"italic"
    },
    product_heart:{
        marginTop: "2%", 
        right: 10, 
        position: "absolute"
    },
})