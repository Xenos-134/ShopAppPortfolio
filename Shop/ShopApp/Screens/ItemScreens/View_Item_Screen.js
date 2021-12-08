//---------------------------------------------------------
//  Screen To Visualize Item Params - Images, Price, Location Full Description
//---------------------------------------------------------

import React from "react";
import { Text, Image, Dimensions, Pressable } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";

const SCREEN = Dimensions.get("screen")

export const ItemPage = ({route}) => {
    const {item} = route.params


    return(
        <Main_Screen_1>
            <Text>
               --- {item.title}
               --- {item.price}
            </Text>
            <Image
                source={{uri: "https://picsum.photos/1000/1000"}}
                style={{width: SCREEN.width, height: SCREEN.height*0.5}}
                resizeMethod="auto"
            />
            <Pressable style={{backgroundColor: "#ccffcc", width: 130, height: 50}}>
                <Text>
                    Buy
                </Text>
            </Pressable>
        </Main_Screen_1>
    )
}