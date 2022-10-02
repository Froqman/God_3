// importere relevante udvidelser
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import firebase from "firebase";
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TenantList from "./components/TenantList";
import FeedList from "./components/FeedList";
import FeedDetails from "./components/FeedDetails";
import Add_edit_Feed from "./components/Add_edit_Feed";
import Add_edit_Tenant from "./components/Add_edit_Tenant";
import TenantDetails from "./components/TenantDetails";
import Welcome from "./components/Welcome"
import Ionicons from "react-native-vector-icons/Ionicons";


// start på app funktionalitet
export default function App() {
//react
  const Stack = createStackNavigator();
//react
  const Tab = createBottomTabNavigator();

  // etablering af databasen i firebase der connectes til min bruger på firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDLUZgjusd5CEbVGw4wzBGAsLeRdJZCy_A",
    authDomain: "god3-2bfc2.firebaseapp.com",
      // databasen url - cloud
    databaseURL: "https://god3-2bfc2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "god3-2bfc2",
    storageBucket: "god3-2bfc2.appspot.com",
    messagingSenderId: "899387675034",
    appId: "1:899387675034:web:06fdccd8d91590dea6ea23"
  };

// initialisere databasen efter den er konfigureret til brugen på firebase og projektet
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // navigation med komponenterne
  const StackNavigation = () => {
    return(
        // de 3 componenter
        <Stack.Navigator>

          <Stack.Screen name={'Tenant List'} component={TenantList}/>
          <Stack.Screen name={'Tenant Details'} component={TenantDetails}/>
          <Stack.Screen name={'Edit Tenant'} component={Add_edit_Tenant}/>
            <Stack.Screen name={'Feed List'} component={FeedList}/>
            <Stack.Screen name={'Feed Details'} component={FeedDetails}/>
            <Stack.Screen name={'Edit Feed'} component={Add_edit_Feed}/>
            <Stack.Screen name={'Welcome'} component={Welcome}/>

        </Stack.Navigator>
    )
  }

  // funktionalitet - Ui
  return (
      <NavigationContainer>
        <Tab.Navigator>

            <Tab.Screen name={'Home'} component={Welcome} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Tenants'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="body" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Add'} component={Add_edit_Tenant} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>

            <Tab.Screen name={'Feed'} component={FeedList} options={{tabBarIcon: () => ( <Ionicons name="newspaper-outline" size={20} />),headerShown:null}}/>
            <Tab.Screen name={'Add Feed'} component={Add_edit_Feed} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>



        </Tab.Navigator>
      </NavigationContainer>
  );
}

// not needed
/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/