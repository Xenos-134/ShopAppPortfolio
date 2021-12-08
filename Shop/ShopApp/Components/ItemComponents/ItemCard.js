import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const SCREEN = Dimensions.get("window")


export const ItemCard = ({itemData, navigate}) => {
    return(
        <Pressable style={styles.product} onPress={()=>navigate(itemData)}>
            <Image 
                source={{uri: `https://picsum.photos/500/500?${itemData.title}`}}
                style={styles.product_image}
                resizeMethod="auto"
            />
            <View style={styles.product_price_box}>
                <Text style={styles.product_price_text}>{itemData.price}$</Text>
                <View style={styles.product_heart}>
                    <AntDesign name="hearto" size={20} color="black" />
                </View>
            </View>
            <View style={styles.product_title_box}>
                <Text style={styles.product_title_text}>{itemData.title}</Text>
            </View>
        </Pressable>
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