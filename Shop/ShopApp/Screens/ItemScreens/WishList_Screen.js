import React from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {
    Text, 
    FlatList, 
    View, 
    Pressable, 
    Dimensions,
    Image
} from "react-native" 


const SCREEN = Dimensions.get("screen")

export const WishList = () => {

    function renderFLItem({item}){
        return(
            <View
                style={{
                    backgroundColor:'white',
                    width: SCREEN.width*0.95,
                    height: SCREEN.height*0.12,
                    marginBottom: 2,
                    flexDirection: "row",
                    alignItems:"center",
                    borderRadius: SCREEN.height*0.02,
                }}
            >
                <Image style={{width: SCREEN.width*0.18, height:  SCREEN.width*0.18, marginHorizontal: 10}} source={{uri: `https://picsum.photos/500/500?${item.id}`}}/>
                <View style={{marginLeft: SCREEN.width*0.05}}>
                    <Text style={{fontSize: 17, fontWeight: "700"}}>{item.title}</Text>
                    <Text>{item.price} $</Text>
                </View>
            </View>
        )
    }


    return(
        <Main_Screen_1>
            <Text>My WishList</Text>
            <FlatList
                data={WISH_LIST}
                renderItem={renderFLItem}
                keyExtractor={item=> item.id}

            />
        </Main_Screen_1>
    )
}


const WISH_LIST = [
    {id: 1, title: "Socks", price: 12.5},
    {id: 2, title: "Books", price: 5},
    {id: 3, title: "Games", price: 7},
    {id: 4, title: "Food", price: 6},
    {id: 5, title: "M Parts", price: 3},
]