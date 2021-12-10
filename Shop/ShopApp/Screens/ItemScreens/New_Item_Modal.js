//Page for 2nd Modal
import React, {useState} from "react"
import { 
    Modal, 
    StyleSheet,
    View, 
    Text, 
    FlatList, 
    Dimensions,
    Pressable
} from "react-native"
import { NewItemFieldsModal } from "./New_Item_Fields_Modal"


const SCREEN = Dimensions.get("window")

export const NewItemModal = ({modalVisible, setMV, navigation}) => {
    const [fieldsModal, setFM] = useState(false)
    const [fields, setFields] = useState(null)

    function newItem(category){
        // setFM(true)
        // for(element in DATA){
        //     if(DATA[element].title === category){
        //         console.log("We want new ", category)
        //         setFields(DATA[element].fields)
        //     }
        // }
        switch(category){
            case "Cars":{
                console.log("We want new Cars")
                return navigation.navigate("NewCar")
            }
            case "Books":{
                return console.log("We want new Book")
            }
            case "Bikes":{
                return console.log("We want new Bike")
            }
            case "Cell Phones":{
                return console.log("We want new ", category)
            }
            case "Jobs":{
                return console.log("We want new ", category)
            }
            default: {
                return console.log("WE WANT UNDEFINED ITEM")
            }
        }

    }

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );


      const Item = ({ title }) => (
        <Pressable 
            onPress={()=>newItem(title)}
            style={({pressed})=>[styles.item_box, {backgroundColor: pressed
                ?"grey"
                :"white"
            }]}>
          <Text style={styles.item_text}>{title}</Text>
        </Pressable>
      );


    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>setMV(false)}
            >
                <View style={styles.modal_box}>
                    <Text style={styles.category_text_title}>Select Category</Text>
                    <FlatList
                        style={{top:"9%"}}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.title}
                    />
                </View>
        </Modal>
    )
}

//<NewItemFieldsModal title={"TITULO QQR"} setFM={setFM} open={fieldsModal} fields={fields}/>

const styles = StyleSheet.create({    
    modal_box:{
        backgroundColor:"white",
        alignItems:"center",
        flex:1
},
    category_text_title:{
        fontSize: 20,
        top: "5%",
        fontWeight:"700",
        fontFamily:"Roboto"
    },
    item_box:{ 
        marginBottom: "2%", 
        height: SCREEN.height*0.07,  
        justifyContent:"center", 
        width:SCREEN.width*0.95,
        borderBottomColor: "black",
        borderBottomWidth: 0.8,
        borderBottomColor: "grey"
    },
    item_text: {
        fontSize:16,
        marginLeft: SCREEN.width*0.05,
        fontFamily: "Roboto",
        fontWeight: "600"
    }

})


//Passar esta data para dentro de um ficheiro a parte
const DATA = [
    {
      title: 'Books',
      fields: [
      ]
    },
    {
    
      title: 'Bikes',
    },
    {
     
      title: 'Cars',
      fields: [
          {title: "Photos", type:"Image"},
          {title: "Brand", type: "Selector", list: [
              "AlfaRomeo",
              "BMW",
              "Audi",
              "Seat",
              "Toyota"
          ]},
          {title: "Model", type: "Selector"},
          {title: "Description", type:"String"},
          {title: "Year", type: "Date"},
          {title: "Version", type: "Number"},
      ]
    },
    {
     
        title: 'Computers',
    },
    {
       
        title: 'Cell Phones',
    },
    {
      
        title: 'Jobs',
    },
  ];

  function createNewCarItem(){
      console.log("Estamos a tentar criar novo Item que 'e carro")
  }