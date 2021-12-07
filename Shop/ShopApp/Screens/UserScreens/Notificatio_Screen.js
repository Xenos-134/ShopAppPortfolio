import React from "react";
import { Button, Text } from "react-native";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";

export const Notifications = ({navigation}) => {
    return(
        <Main_Screen_1>
            <Text>
                Page for notifications
                <Button
                    title="Chat"
                    onPress={()=>navigation.navigate("ChatScreen")}
                />
                <Button
                    title="Chat"
                    onPress={()=>navigation.navigate("ChatScreen")}
                />
            </Text>
        </Main_Screen_1>
    )
}