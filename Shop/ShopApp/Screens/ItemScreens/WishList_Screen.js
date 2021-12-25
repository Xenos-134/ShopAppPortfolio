import React, {useContext, useEffect, useState} from "react";
import { Main_Screen_1 } from "../MainScreens/Main_Screen_1";
import {
    Text, 
    FlatList, 
    View, 
    Pressable, 
    Dimensions,
    Image,
    StyleSheet,
    Button
} from "react-native" 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { OpenContext } from "../../Context/AuxContext";
import { useFetch } from "../../Hooks/fetchHook";


const SCREEN = Dimensions.get("screen")

export const WishList = ({navigation, route}) => {
    
    const [x, sx] = useState()
    const [y, sy] = useState()
    const [open, setOpen] = useState(false)
    const [currentItem, setCU] = useState(null) //Im lazy fuk
    const [items, setItems] = useState(null)
    const fetch = useFetch()


    //*****************************************************
    // useEffect section
    //*****************************************************
    useEffect(()=>{
        getWLItems()
    },[])


    //*****************************************************
    // Custom Function section
    //*****************************************************

    //Get Elements from 
    async function getWLItems(){
        const list = await fetch.getWLItems()
        //console.log("My List ", list)
        setItems([...WISH_LIST, ...list])
        //console.log(items)
        return list
    }


    //Delete option
    async function deleteItem(id){
        const new_items = await items.filter(elm => elm.id !== id)
        setItems(new_items)
        setOpen(false)
    }

    //Chat with owner option
    async function chatWithOwner(){
        setOpen(false)
        navigation.navigate("Chat")
    }

    async function viewItemPage(){
        setOpen(false)
        navigation.navigate("Home", {
            screen: "ItemPage",
            params: {item: currentItem}
        })
    }

    function getItemTitle(item){
        switch(item.modelClass){
            case "Car":
                return item.brand + item.description
            default:
                return item.title
        }
    }

    function getItemID(item){
        switch(item.modelClass){
            case "Car":
                return item._id
            default:
                return item.id
        }
    }



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
                    <Text style={{fontSize: 17, fontWeight: "700"}}>{getItemTitle(item)}</Text>
                    <Text>{item.price} $</Text>
                </View>
                <View style={{ position:"absolute", left: SCREEN.width*0.85}}>
                    <Pressable
                        onPress={(e)=>{
                            setOpen(false)
                            setCU(item)
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
            <Button
                title="test"
                onPress={getWLItems}
            />
            <FlatList
                data={items}
                onScroll={()=>setOpen(false)}
                renderItem={renderFLItem}
                keyExtractor={item=> getItemID(item)}
                ListFooterComponent={()=><View style={{height: SCREEN.height*0.25}}/>}
            />
            {open && 
                <View
                    style={{
                        position:"absolute",
                        width: SCREEN.width*0.3,
                     
                        top: y-SCREEN.height*0.09,
                        left: x-SCREEN.width*0.25,
                        backgroundColor: "white",
                        //borderRadius: SCREEN.height*0.02,
                        alignItems:"center",
                        paddingVertical: 10,
                        elevation: 5
                    }}>
                    <Pressable style={{marginBottom: 9}}onPress={()=>setOpen(false)}>
                                <AntDesign name="close" size={20} color="black" />
                    </Pressable>

                    <View style={{width:"100%", alignItems: "flex-start", paddingLeft: 10}}>
                        <Pressable
                            onPress={()=>deleteItem(currentItem.id)} 
                            style={styles.itemOptions}>
                                <AntDesign name="delete" size={20} color="black" />
                                <Text>Delete</Text>
                        </Pressable>

                        <Pressable 
                            onPress={chatWithOwner}
                            style={styles.itemOptions}>
                                <AntDesign name="mail" size={20} color="black" />
                                <Text>Chat</Text>
                        </Pressable>

                        <Pressable style={styles.itemOptions}>
                                <AntDesign name="shoppingcart" size={20} color="black" />
                                <Text>Buy</Text>
                        </Pressable>
                        
                        <Pressable
                            onPress={()=>viewItemPage()} 
                            style={styles.itemOptions}>
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

const styles = StyleSheet.create({
    itemOptions:{
        flexDirection:"row", 
        marginBottom: 5
    }
})