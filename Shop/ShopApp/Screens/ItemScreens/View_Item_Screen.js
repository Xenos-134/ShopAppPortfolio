//---------------------------------------------------------
//  Screen To Visualize Item Params - Images, Price, Location Full Description
//---------------------------------------------------------

import React from "react";
import { Text, Image, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")
import {COLORS} from "../../Components/Colors/colors"

export const ItemPage = ({route}) => {
    const {item} = route.params


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
                borderColor: "#bfbfbf"
            }}>
                <Text style={{fontSize:15, marginTop: SCREEN.height*0.02}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta sollicitudin metus quis pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque gravida, augue id mollis pellentesque, lacus magna facilisis nunc, sit amet eleifend est justo ac lorem. Curabitur non arcu ante. Quisque auctor interdum metus, ac commodo turpis commodo sit amet. Fusce nec libero eget lectus volutpat rutrum. Fusce semper fringilla elit, a varius turpis. In urna mi, rhoncus ut feugiat eget, vulputate id dui.

Nam eget gravida leo. Vivamus tortor massa, fermentum volutpat ex nec, fermentum auctor ipsum. Nam pharetra diam eget ante gravida, ut placerat dolor fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquet sapien ut vestibulum vulputate. Maecenas elementum risus nec bibendum imperdiet. Praesent pulvinar feugiat nisi at imperdiet. Phasellus quis venenatis augue, non varius metus. Vestibulum posuere est mauris, sed tincidunt erat pulvinar at. 
                </Text>
            </View>

            </ScrollView>
            <Pressable style={styles.buy_button}>
                <Text style={{color:"white", fontSize: 15, fontWeight: "700"}}>
                    Buy
                </Text>
            </Pressable>
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
        position: "absolute",
        bottom: SCREEN.height*0.06,
        borderRadius: SCREEN.height*0.035
    },
})