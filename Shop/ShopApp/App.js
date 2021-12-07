//---------------------------------------------------------
//  React Native Components
//---------------------------------------------------------
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';


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


//Context
import { OpenContext } from './Context/AuxContext';
import { ChatScreen } from './Screens/UserScreens/Chat_Screen';
const SCREEN = Dimensions.get("window")



export default function App() {
  const [open, setOpen] = useState(false)
  
  function of(){ //openfunction
    setOpen(!open)    
  }

  return (
    <OpenContext.Provider value={{of, open}}>
      <NavigationContainer >
        <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={(props) => <MyTabBar of={of} {...props} />}>
          <Tab.Screen name="Home" component={PrincipalScreen} />
          <Tab.Screen name="+" component={Nothing}/>
          <Tab.Screen name="Chat" component={ChatScreen}/>
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </OpenContext.Provider>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
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

function MyTabBar({ state, descriptors, navigation, of }) {
  return (
    <View style={{ flexDirection: 'row', height:SCREEN.height*0.075, alignItems:"center", justifyContent:"center"}}>
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
          if(label==="NewItem") return of()
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
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
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



