import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import firebase from "firebase";
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TenantList from "./components/TenantList";
import Add_edit_Tenant from "./components/Add_edit_Tenant";
import TenantDetails from "./components/TenantDetails";
import Ionicons from "react-native-vector-icons/Ionicons";



export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyDLUZgjusd5CEbVGw4wzBGAsLeRdJZCy_A",
    authDomain: "god3-2bfc2.firebaseapp.com",
    databaseURL: "https://god3-2bfc2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "god3-2bfc2",
    storageBucket: "god3-2bfc2.appspot.com",
    messagingSenderId: "899387675034",
    appId: "1:899387675034:web:06fdccd8d91590dea6ea23"
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Tenant List'} component={TenantList}/>
          <Stack.Screen name={'Tenant Details'} component={TenantDetails}/>
          <Stack.Screen name={'Edit Tenant'} component={Add_edit_Tenant}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Add'} component={Add_edit_Tenant} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/