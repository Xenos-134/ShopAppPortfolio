//---------------------------------------------------------
//  React Native Components
//---------------------------------------------------------
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


//---------------------------------------------------------
//  My Custom Components
//---------------------------------------------------------
import { AuthScreen } from './Screens/Auth_Screen';
import { MainScreen } from './Components/ScreenBackGround/Main_Screen_Component';
import { SignUp } from './Screens/SignUp_Screen';
import { Login } from './Screens/Auth_Screens/Login_Screen';
import { PrincipalScreen } from './Screens/Principal_Screen';


//---------------------------------------------------------
//  Navigation Components
//---------------------------------------------------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()

//TAB NAVIGATION
const Tab = createBottomTabNavigator()


{/* <Stack.Screen name="AuthScreen" component={AuthScreen}/>
<Stack.Screen name="LoginScreen" component={Login}/>
<Stack.Screen name="SignUp" component={SignUp}/> */}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PrincipalScreenTab" component={StackScreens}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const StackScreens = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen}/>
      <Stack.Screen name="AuthScreen" component={AuthScreen}/>
      <Stack.Screen name="LoginScreen" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
  )
}
