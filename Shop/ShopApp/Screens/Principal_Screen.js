import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Button, Modal, ViewPropTypes, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import { Main_Screen_1 } from "./MainScreens/Main_Screen_1";
import { ItemCard } from "../Components/ItemComponents/ItemCard";
import { NewItemModal } from "./ItemScreens/New_Item_Modal";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useFetch } from "../Hooks/fetchHook";

import { OpenContext } from "../Context/AuxContext"; //My Context



const SCREEN = Dimensions.get("window")

//test is temp arg func to test some shit
const ItemListRow = ({item, navigate, getItemTitle, addToWL}) => {
    if(item.complete){
        return(
            <View style={{flexDirection: "row", width: SCREEN.width, justifyContent:"center"}}>
                <ItemCard 
                    itemData={{
                            title: getItemTitle(item.fe), 
                            price: item.fe.price, 
                            id: item.fe._id,
                            ownerID: item.fe.ownerId
                        }}
                    isLiked={item.fe.liked || false}
                    addToWL={addToWL}
                    image={item.fe.image}
                    navigate={navigate}/>
                <ItemCard 
                    itemData={{
                        title: getItemTitle(item.se), 
                        price: item.se.price, 
                        id: item.se._id,
                        ownerID: item.se.ownerId
                    }}
                    isLiked={item.se.liked || false}
                    addToWL={addToWL} 
                    image={item.se.image}
                    navigate={navigate}/>
            </View>
        )
    }
    return(
        <View style={{flexDirection: "row", marginLeft: SCREEN.width*0.03}}>
                <ItemCard 
                    itemData={{
                        title: getItemTitle(item.fe), 
                        price: item.fe.price, 
                        id: item.fe._id,
                        ownerID: item.fe.ownerId
                    }}
                    isLiked={item.fe.liked || false}
                    addToWL={addToWL}
                    image={item.fe.image} 
                    navigate={navigate}/>
        </View>
    )
}


export const PrincipalScreen = ({navigation}) => {
    const [modalVisible, setMV] = useState(false)
    const [pairs, setPairs] = useState() //list for pairs for pairs of the elements 
    const [isLoaded, setLoaded] = useState(false)
    const [itemList, setItemList] = useState()
    const oc = useContext(OpenContext)
    const fetch = useFetch()


    //*****************************************************
    // useEffect section
    //*****************************************************
    useEffect(()=>{
        //setItemList(ItemList)
        loadItems()
    },[])


    useEffect(()=>{
        setLoaded(true)
    },[pairs])


    //Called when item list is loaded
    useEffect(()=>{
        itemList && arrangePairsHandler(itemList)
    }, [itemList])


    //*****************************************************
    // Custom Function section
    //*****************************************************

    //FIlters based on the modelClass {Car, Phone, Computer ...}
    async function filterHandler(model){
        const filteredList = await itemList.filter(item => item.modelClass === model)
        console.log("Filtered List \n", filteredList )
    }


    //Function that adds/removes item to/from WishList
    async function addToWL(item){
        var itemListCopy = itemList
        if(!item.id) return
        var selectedItem = await itemListCopy.find(elm => elm._id === item.id)
        if(!selectedItem.liked) selectedItem.liked = true
        else  selectedItem.liked = !selectedItem.liked
        fetch.addToWishList(item.id)
        setItemList([...itemListCopy])
    }

    //Function that loads item
    async function loadItems(){
        try{
            const items = await getItemsFromServer()
            setItemList([...items])
        }catch(e){
            console.log("Impossible to load items ", e)
        }
    }


    //Aux function that i pass inside other component no navigate to item screen
    function navigate(item){
        //console.log("Success", item)
        navigation.navigate("ItemPage", {item})
    }

    async function getItemsFromServer(){
        try{
            const items = await fetch.getAllItems()
            return items
        }catch(e){
            console.log("Some error")
            throw "Some error"
        }
    }

    function getItemTitle(item){
        switch(item.modelClass){
            case "Car":
                return item.brand+" "+item.model+" "+item.version
            default:
                return item.title
        }
    }



    //Function That aranges my list of items into pairs cuz of 2 items per row
    async function arrangePairsHandler(itemList){

        var pairs_list = [];
        var i = 0;
            while(i < itemList.length){
                const pair = {
                    fe: itemList[i], 
                    se: itemList[i+1], 
                    key: i, 
                    complete: itemList[i+1]?true:false,
                }
                pairs_list.push(pair)
                i=i+2;
            }
        setPairs(pairs_list)        
    }   


    return(
        <Main_Screen_1>

            <FlatList
                ListHeaderComponent={listHeader}
                data={pairs}
                keyExtractor={item => item.key}
                renderItem={({item})=>ItemListRow({item, navigate, getItemTitle, addToWL})}
                ListFooterComponent={()=><View style={{height: SCREEN.height*0.1}}/>}
            />
            <NewItemModal modalVisible={oc.open} setMV={oc.of} navigation={navigation}/>
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


const ItemList = [
    {title:"First Item", price:10},
    {title:"Second Item", price:4},
    {title:"3rd Item", price:5},
    {title:"4th Item", price:15},
    {title:"5th Item", price:64},
    {title:"6th Item", price:23},
    {title:"7th Item", price:64},
    {title:"8th Item", price:75},
    {title:"9th Item", price:26},
    {title:"10th Item", price:17},
    
]

const filterSelector = [
    "Books",
    "Bikes",
    "Cars",
    "Computers",
    "CellPhones"
]

const listHeader = () => {
    return(
        <View
            style={{alignItems:"center"}}
        >
            <View style={{
                backgroundColor: "grey",
                height: SCREEN.height*0.06,
                width: SCREEN.width*0.95,
                alignItems:"center",
                justifyContent:"center",
                borderRadius: SCREEN.height*0.03,
                marginBottom: 10
            }}>
                <View style={{flexDirection:"row"}}>
                    <FontAwesome name="search" size={22} color="black" />
                    <View style={{marginLeft: 5}}> 
                        <Text>
                            Search
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}