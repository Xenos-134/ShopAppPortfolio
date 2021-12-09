//---------------------------------------------------------
//  React Native Components
//---------------------------------------------------------

import React, { createContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions,
} from 'react-native';


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
import { ChatScreen } from './Screens/UserScreens/Chat_Screen';
import { ItemPage } from './Screens/ItemScreens/View_Item_Screen';
import { Chat_Chanels } from './Screens/UserScreens/Chat_Chanels_Screen';
const SCREEN = Dimensions.get("window")



export default function App() {
  const [open, setOpen] = useState(false)
  const [ok, setOk] = useState(false) //opened Keyboard



  function of(){ //openfunction
    console.log("ESTAMOS A ABRIR")
    setOpen(!open)    
  }

  function sok(flag){ //Function to hide tab navigator
    setOk(flag)
    //console.log("Tentamos Abrir chat - ", ok, "/", flag)
  }

  return (
    <OpenContext.Provider value={{of, open, ok, sok}}>
      <NavigationContainer >
        <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={(props) => <MyTabBar of={of} ok={ok} {...props} />}>
          <Tab.Screen name="Home" component={StackScreen} />
          <Tab.Screen name="+" component={Nothing}/>
          <Tab.Screen name="Chat" component={SChat}/>
          <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </OpenContext.Provider>
  );
}


//Swipable tab navigator for notifications and messages
//screenOptions={{tabBarStyle: { backgroundColor: '#ccffcc', top: Constants.statusBarHeight }}}
function SChat(){
  return(
    <STab.Navigator screenOptions={{tabBarStyle: {heigh:0,top: Constants.statusBarHeight }}}>
      <Stack.Screen name="Messages" component={Chat_Chanels}/>
      <STab.Screen  name="ChatScreen" component={ChatScreen}/>
    </STab.Navigator>
  )
}


// Will use this stack afther
function StackScreen(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomePage" component={PrincipalScreen}/>
      <Stack.Screen name="ItemPage" component={ItemPage}/>
    </Stack.Navigator>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function Nothing() {
    return(null)
}

function MyTabBar({ state, descriptors, navigation, of, ok }) {
  return (
    <View style={{ flexDirection: 'row', height:ok?0:SCREEN.height*0.075, alignItems:"center", justifyContent:"center", elevation: 10}}>


      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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

        
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#009933' : '#222' }}>
              {label}
            </Text>
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



