//navigator
import * as React from "react";
import { useEffect, useState,useContext,useCallback } from "react";
import {mycontext} from './context'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import SplashScreen from "react-native-splash-screen";
import {LocationScreen} from '../components/locationScreen/LocationScreen'
import { Icon } from 'react-native-elements'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,FlatList,Image,
    Text,
    StatusBar,Button, TouchableOpacity
  } from 'react-native';

import DetailScreen from "../components/detailScreen/DetailScreen";

import HomeScreen from "../components/homeScreen/HomeScreen";

import {styles} from './../components/homeScreen/Styles'
// import Profile from "../../Components/Profile";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//I
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };
function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
    >
       
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
          
/>
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
   
      
    </Stack.Navigator>
  );
}

function AppContainer()
{
  return (
    
    <NavigationContainer>
       
<HomeStackNavigator/>
    </NavigationContainer>
 
  );
}
export default AppContainer;
