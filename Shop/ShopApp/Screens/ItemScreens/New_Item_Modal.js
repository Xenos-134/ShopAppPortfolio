import React from "react"
import { Modal, StyleSheet, View, Text, FlatList } from "react-native"


export const NewItemModal = ({modalVisible, setMV}) => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );


      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
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
    }
})



const DATA = [
    {
    
      title: 'Books',
    },
    {
    
      title: 'Bikes',
    },
    {
     
      title: 'Cars',
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