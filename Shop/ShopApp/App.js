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
import { NewItemScreen } from './Screens/ItemScreens/NewItem_Screen';


//---------------------------------------------------------
//  Navigation Components
//---------------------------------------------------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()
import { CardStyleInterpolators } from '@react-navigation/stack';

//TAB NAVIGATION
const Tab = createBottomTabNavigator()




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
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} />
      <Stack.Screen name="NewItemScreen" component={NewItemScreen}/>
      <Stack.Screen name="AuthScreen" component={AuthScreen}/>
      <Stack.Screen name="LoginScreen" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
  )
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