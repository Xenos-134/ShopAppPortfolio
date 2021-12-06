//---------------------------------------------------------
//  Screen That Displays All Messages Of The User
//---------------------------------------------------------

import React from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {View, Text} from "react-native"

export const ChatScreen = () => {
    return(
        <Main_Screen_1>
            <View>
                <Text>
                    Menssages Screen
                </Text>
            </View>
        </Main_Screen_1>
    )
}