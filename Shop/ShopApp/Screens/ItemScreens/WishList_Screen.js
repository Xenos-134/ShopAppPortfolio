import React, {useEffect, useState} from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {
    Text, 
    FlatList, 
    View, 
    Pressable, 
    Dimensions,
    Image
} from "react-native" 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const SCREEN = Dimensions.get("screen")

export const WishList = () => {
    
    const [x, sx] = useState()
    const [y, sy] = useState()
    const [open, setOpen] = useState(false)



    function renderFLItem({item}){
        return(
            <View style={{width: SCREEN.width, alignItems:"center"}}>
                
                <View
                    style={{
                        backgroundColor:'white',
                        width: SCREEN.width*0.95,
                        height: SCREEN.height*0.12,
                        marginBottom: SCREEN.height*0.01,
                        flexDirection: "row",
                        alignItems:"center",
                        borderRadius: SCREEN.height*0.02,
                        elevation: 5
                        }}
                >
                <Image style={{
                        width: SCREEN.width*0.25, 
                        height:"100%", 
                        marginRight: 10, 
                        borderTopLeftRadius: SCREEN.height*0.02,
                        borderBottomLeftRadius: SCREEN.height*0.02,
                        }} 
                    source={{uri: `https://picsum.photos/500/500?${item.id}`}}/>
                <View style={{marginLeft: SCREEN.width*0.05}}>
                    <Text style={{fontSize: 17, fontWeight: "700"}}>{item.title}</Text>
                    <Text>{item.price} $</Text>
                </View>
                <View style={{ position:"absolute", left: SCREEN.width*0.85}}>
                    <Pressable
                        onPress={(e)=>{
                            setOpen(false)
                            sx(e.nativeEvent.pageX)
                            sy(e.nativeEvent.pageY)
                            setOpen(true)
                        }}
                    >
                        <SimpleLineIcons 
                            name="options-vertical" 
                            size={20} 
                            color="black" 
                            />
                    </Pressable>
                </View>
            </View>
            </View>
        )
    }


    return(
        <Main_Screen_1>
            <Text>My WishList</Text>
            <FlatList
                data={WISH_LIST}
                onScroll={()=>setOpen(false)}
                renderItem={renderFLItem}
                keyExtractor={item=> item.id}
                ListFooterComponent={()=><View style={{height: SCREEN.height*0.25}}/>}

            />
            {open && 
                <View
                    style={{
                        position:"absolute",
                        width: SCREEN.width*0.3,
                        
                        borderWidth: 2,
                        top: y-SCREEN.height*0.09,
                        left: x-SCREEN.width*0.25,
                        backgroundColor: "white",
                        borderRadius: SCREEN.height*0.02,
                        alignItems:"center",
                        paddingVertical: 10
                    }}>
                    <Pressable style={{marginBottom: 9}}onPress={()=>setOpen(false)}>
                                <AntDesign name="close" size={20} color="black" />
                    </Pressable>

                    <View style={{width:"100%", alignItems: "flex-start", paddingLeft: 10}}>
                        <Pressable style={{flexDirection:"row", marginBottom: 5}}>
                                <AntDesign name="delete" size={20} color="black" />
                                <Text>Delete</Text>
                        </Pressable>

                        <Pressable style={{flexDirection:"row", marginBottom: 5}}>
                                <AntDesign name="mail" size={20} color="black" />
                                <Text>Chat</Text>
                        </Pressable>

                        <Pressable style={{flexDirection:"row", marginBottom: 5}}>
                                <AntDesign name="shoppingcart" size={20} color="black" />
                                <Text>Buy</Text>
                        </Pressable>
                        
                        <Pressable style={{flexDirection:"row", marginBottom: 5}}>
                                <AntDesign name="eyeo" size={20} color="black" />
                                <Text>View</Text>
                        </Pressable>
                    </View>
                    </View>
            }
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