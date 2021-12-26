//---------------------------------------------------------
//  Screen To Visualize Item Params - Images, Price, Location Full Description
//---------------------------------------------------------

import React, { useEffect } from "react";
import { Text, Image, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")
import {COLORS} from "../../Components/Colors/colors"
import { useFetch } from "../../Hooks/fetchHook";

export const ItemPage = ({route}) => {
    const {item} = route.params
    const rate = 3
    const fetch = useFetch()

    useEffect(()=>{
        //getElementFromServer()
    }, [])


    async function getElementFromServer(){
        const item = await fetch.getElement(route.params.item.id)
        console.log("My item ", item)
    }   

    return(
        <Main_Screen_1>
            <ScrollView>
            <Image
                source={{uri: "https://picsum.photos/1000/1000"}}
                style={styles.item_image}
                resizeMethod="auto"
            />
            <View style={{
                width: SCREEN.width*0.95,
                //height: SCREEN.height*0.25,
                left: SCREEN.width*0.025, //Im Lazy fuk. Dont know why alignItems doesnt work on top Component
                borderBottomWidth: 1,
                borderColor: "#bfbfbf"
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "700",
                    left: SCREEN.width*0.07,
                    paddingTop: "3%"
                }}>
                    {item.price} EUR
                </Text>

                <Text style={{
                    fontSize: 18,
                    fontWeight: "700",
                    left: SCREEN.width*0.07,
                    paddingTop: "1%"
                }}>
                    {item.title} 
                </Text>

                <Text style={{
                    fontSize: 15,
                    fontWeight: "600",
                    left: SCREEN.width*0.07,
                    paddingTop: "1%",
                    marginBottom: SCREEN.height*0.02,
                    color: "grey"
                }}>
                    As good as New 
                </Text>
            </View>

            <View style={{
                width: SCREEN.width*0.95,
                left: SCREEN.width*0.025, //Im Lazy fuk. Dont know why alignItems doesnt work on top Component
                borderBottomWidth: 1,
                borderColor: "#bfbfbf",
                
            }}>
                <Text style={{
                    fontSize:15, 
                    marginTop: SCREEN.height*0.02,
                    color: "grey",
                    marginBottom: SCREEN.height*0.02
                    }}>
                    {text}
               </Text>
            </View>

            <View style={{
                flexDirection:"row",
                width: SCREEN.width*0.95,
                left: SCREEN.width*0.025, //Im Lazy fuk. Dont know why alignItems doesnt work on top Component
                marginBottom: SCREEN.height*0.15,
                //alignItems:"center",
   
                padding:5
            }}>
                <Image
                    source={{uri:"https://picsum.photos/200/201"}}
                    style={{
                        width: SCREEN.width*0.15, 
                        height:SCREEN.width*0.15, 
                        borderRadius:SCREEN.width*0.075,
                        marginRight:SCREEN.height*0.02,
                    }}
                />
                <View >
                    <Text style={{
                        fontSize:15, 
                        color: "grey",
                        }}>
                        John Peterso
                    </Text>
                    <View style={{flexDirection:"row"}}>
                        <FontAwesome name="star" size={22} color="#e6e600" />
                        <FontAwesome name={(rate>1)?"star":"star-o"} size={24} color="#e6e600" />
                        <FontAwesome name={(rate>2)?"star":"star-o"}  size={24} color="#e6e600" />
                        <FontAwesome name={(rate>3)?"star":"star-o"}  size={24} color="#e6e600" />
                        <FontAwesome name={(rate>4)?"star":"star-o"}  size={24} color="#e6e600" />
                    </View>
                </View>
            </View>


            </ScrollView>
            <View style={{flexDirection:"row", width: SCREEN.width, justifyContent:"center"}}>
                <Pressable style={styles.buy_button}>
                    <Text style={{
                        color:"white", 
                        fontSize: 15, 
                        fontWeight: "700",
                        }}>
                        Buy
                    </Text>
                </Pressable>

                <Pressable
                    onPress={getElementFromServer} 
                    style={[styles.buy_button, {backgroundColor:COLORS.orange}]}>
                    <Text style={{
                        color:"white", 
                        fontSize: 15, 
                        fontWeight: "700",
                        }}>
                        Send Message
                    </Text>
                </Pressable>
            </View>
        </Main_Screen_1>
    )
}

const styles = StyleSheet.create({
    item_image:{
        width: SCREEN.width, 
        height: SCREEN.height*0.381,
    },
    buy_button: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: COLORS.green, 
        width: SCREEN.width*0.45,
        height: SCREEN.height*0.07,  
        bottom: SCREEN.height*0.06,
        borderRadius: SCREEN.height*0.035,
        marginHorizontal: 10
    },
})

const text = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta sollicitudin metus quis pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque gravida, augue id mollis pellentesque, lacus magna facilisis nunc, sit amet eleifend est justo ac lorem. Curabitur non arcu ante. Quisque auctor interdum metus, ac commodo turpis commodo sit amet. Fusce nec libero eget lectus volutpat rutrum. Fusce semper fringilla elit, a varius turpis. In urna mi, rhoncus ut feugiat eget, vulputate id dui.Nam eget gravida leo. Vivamus tortor massa, fermentum volutpat ex nec, fermentum auctor ipsum. Nam pharetra diam eget ante gravida, ut placerat dolor fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquet sapien ut vestibulum vulputate. Maecenas elementum risus nec bibendum imperdiet. Praesent pulvinar feugiat nisi at imperdiet. Phasellus quis venenatis augue, non varius metus. Vestibulum posuere est mauris, sed tincidunt erat pulvinar at"