//---------------------------------------------------------
//  React Native Components
//---------------------------------------------------------

import React, { createContext, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import io from "socket.io-client"

//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import { AuthScreen } from './Screens/Auth_Screen';
import { MainScreen } from './Components/ScreenBackGround/Main_Screen_Component';
import { SignUp } from './Screens/SignUp_Screen';
import { Login } from './Screens/Auth_Screens/Login_Screen';
import { PrincipalScreen } from './Screens/Principal_Screen';
import { NewItemScreen } from './Screens/ItemScreens/NewItem_Screen';
import { Notifications } from './Screens/UserScreens/Notificatio_Screen';
import { WishList } from './Screens/ItemScreens/WishList_Screen';
import { ChatScreen } from './Screens/UserScreens/Chat_Screen';
import { ItemPage } from './Screens/ItemScreens/View_Item_Screen';
import { Chat_Chanels } from './Screens/UserScreens/Chat_Chanels_Screen';
import { NewItemCarPage } from './Screens/ItemScreens/NewItemClassPages/New_Item_Car';
import { Settings_Screen } from './Screens/Setting_Screen';


//---------------------------------------------------------
//  Navigation Components
//---------------------------------------------------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; // swipable navigation

//Stack navigation
const Stack = createNativeStackNavigator()

//TAB NAVIGATION
const Tab = createBottomTabNavigator()

//Swipable tab navigation
const STab = createMaterialTopTabNavigator()


//Context
import { OpenContext } from './Context/AuxContext';

const SCREEN = Dimensions.get("window")
import {AuthContext} from "./Context/AuthContext"



export default function App() {
  const [open, setOpen] = useState(false)
  const [ok, setOk] = useState(false) //opened Keyboard
  const [userToken, setUserToken] = useState(null)
  const [loggedIn, setLI]= useState(false)
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
      getSocket()
    getItemFromStorage()
    //AsyncStorage.removeItem("storage")
  },[])

  async function getSocket(){
    const socket = await io("http://192.168.0.81:5000")
    //console.log("socket ", socket)
  }

  function of(){ //openfunction
    //console.log("ESTAMOS A ABRIR/FECHAR")
    setOpen(!open)    
  }

  function sok(flag){ //Function to hide tab navigator
    setOk(flag)
  }

  useEffect(()=>{
    saveTokenToStorage(userToken)
    //console.log(userToken)
  },[userToken])

  //This shit is watching for changes in state of the userToken 
  // useEffect(()=>{ 
  //   console.log("TEST", loggedIn)
  // },[loggedIn])


  async function saveTokenToStorage(token){
    if(!token) return 
    AsyncStorage.setItem("Storage", await JSON.stringify({token}))
    setUserToken(token)
    setLI(true)
  }

  async function getItemFromStorage(){
    const token = await JSON.parse(await AsyncStorage.getItem("Storage"))
    if(token.token === null) return
    setUserToken(token.token)
    setLI(true)
  }

  async function logOut(){
    setUserToken(null)
    await AsyncStorage.removeItem("Storage")
    setLI(false)
  }

  if(!loggedIn){
    return(
      <AuthContext.Provider value={{userToken, setUserToken}}>
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{userToken, setUserToken, logOut}}>
      <OpenContext.Provider value={{of, open, ok, sok}}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={(props) => <MyTabBar of={of} ok={ok} {...props} />}>
            <Tab.Screen name="Home" component={StackScreen} />
            <Tab.Screen name="Wish List" component={WishList}/>
            <Tab.Screen name="+" component={StackScreen}/>
            <Tab.Screen name="Chat" component={SChat}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </OpenContext.Provider>
    </AuthContext.Provider>
  );
}


//Swipable tab navigator for notifications and messages
//screenOptions={{tabBarStyle: { backgroundColor: '#ccffcc', top: Constants.statusBarHeight }}}
function SChat(){
  return(
    <STab.Navigator screenOptions={{tabBarStyle: {heigh:0,top: Constants.statusBarHeight }}}>
      <Stack.Screen name="Messages" component={ChatStack}/>
      <STab.Screen  name="Alerts" component={Notifications}/>
    </STab.Navigator>
  )
}


function ChatStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="MessagesList" component={Chat_Chanels}/>
      <Stack.Screen name="Private_Chat" component={ChatScreen} />
    </Stack.Navigator>
  )
}


// Will use this stack afther
function StackScreen(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomePage" component={PrincipalScreen}/>
      <Stack.Screen name="ItemPage" component={ItemPage}/>
      <Stack.Screen name="NewCar" component={NewItemCarPage} />
    </Stack.Navigator>
  )
}


<Settings_Screen/>
//Temporary Component
function SettingsScreen() {
  const auth = useContext(AuthContext)
  return (
    <Settings_Screen/>
  );
}

function Nothing() {
    return(null)
}


//Tab Bar Navigator Component
function MyTabBar({ state, descriptors, navigation, of, ok }) {
  return (
    <View style={{ flexDirection: 'row', height:ok?0:SCREEN.height*0.075, alignItems:"center", justifyContent:"center", elevation: 5}}>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        var icon_label;
        switch(label){
          case "Home":{
            icon_label = "home"
            break;
          }
          case "Chat":{
            icon_label = "message-square"
            break
          }
          case "+":{
            icon_label = "plus-circle"
            break
          }
          case "Settings":{
            icon_label = "settings"
            break
          }
          case "Wish List":{
            icon_label = "heart"
            break
          }
          default:{ //Add something here
            icon_label="random"
          }
        }


        const onPress = () => {
          if(label==="+") return of()
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            }
          };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };



        if(label === "+"){
          return(
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems:"center" }}
            >
              <View style={
                  {backgroundColor:"white", 
                  height: SCREEN.height*0.12, 
                  width: SCREEN.height*0.12,
                  borderRadius: SCREEN.height*0.06,

                  alignItems:"center", 
                  justifyContent:"center",
                }
                }>
                <Feather name={icon_label} size={32} color={isFocused?"#009933":"#222"} />
              </View>
            </TouchableOpacity>
          )
        }



        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:"center" }}
          >
            <Feather name={icon_label} size={24} color={isFocused?"#009933":"#222"} />
          </TouchableOpacity>
        );
      })}

    </View>
  );
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};



{/* <Text style={{ color: isFocused ? '#009933' : '#222' }}>
{label}

<Feather name="home" size={24} color={isFocused?"#009933":"#222"} />

</Text> */}
