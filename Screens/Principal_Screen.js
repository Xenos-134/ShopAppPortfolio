import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { ItemCard } from "../Components/ItemComponents/ItemCard";

const SCREEN = Dimensions.get("window")


export const PrincipalScreen = () => {

    function randomNumber(){
        return Math.floor(Math.random() * (10 - 1)) + 1
    }

    return(
        <Main_Screen_1>
            <View style={{flexDirection: "row"}}>
                <View style={styles.product}>
                    <Image 
                        source={{uri: `https://picsum.photos/500/500?813${randomNumber}`}}
                        style={styles.product_image}
                        resizeMethod="auto"
                    />
                    <View style={styles.product_price_box}>
                        <Text style={styles.product_price_text}>12$</Text>
                        <View style={styles.product_heart}>
                            <AntDesign name="hearto" size={20} color="black" />
                        </View>
                    </View>
                    <View style={styles.product_title_box}>
                        <Text style={styles.product_title_text}>Long Long Long Title That Should Overflow</Text>
                    </View>
                </View>
                <ItemCard itemData={{title: "SMALL TITLE FOR MY NEW ELEMENT. HELLO WORLD", price: "23"}}/>
            </View>
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