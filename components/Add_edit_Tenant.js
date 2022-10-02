import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// konstant for skemaet/klasse variationen til ny bruger
const Add_edit_Tenant = ({navigation,route}) => {

    const initialState = {
        lastName: '',
        address: '',
        union: '',
        userName: '',
    }
// start på ny bruger
    const [newTenant,setNewTenant] = useState(initialState);

    /*true når tenant skal redigeres*/
    const isEditTenant = route.name === "Edit tenant";

    useEffect(() => {
        if(isEditTenant){
            const tenant = route.params.tenant[1];
            setNewTenant(tenant)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewTenant(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewTenant({...newTenant, [name]: event});
    }
// gem ny bruger
    const handleSave = () => {

        const { lastName, address, union, userName } = newTenant;

        // requirements for ny bruger tegn.
        if(lastName.length === 0 || address.length === 0 || union.length === 0  ){
            return Alert.alert('Empty field!');
        }
// gemmes i firebase database.
        if(isEditTenant){
            const id = route.params.tenant[0];
            try {
                firebase
                    .database()
                    .ref(`/Tenants/${id}`)
                    // update, så kun de felter der redigeres opdateres i databasen.
                    .update({ lastName, address, union, userName });
                // Når tenant er opdateret = back 2 start.
                Alert.alert("Din profil er opdateret, vend tilbage til start");
                const tenant = [id,newTenant]
                navigation.navigate("Tenant Details",{tenant});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{
        // requesten fra endpoint til databasen.
            try {
                firebase
                    .database()
                    .ref('/Tenants/')
                    .push({ lastName, address, union, userName });
                Alert.alert(`Saved`);
                setNewTenant(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };
// button for tenant der skal addes eller redigeres med homescreen
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newTenant[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Ny bruger vises "add tenant" eller changes are saved, hvis der redigeres*/}
                <Button title={ isEditTenant ? "changes are saved" : "Add tenant"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

// eksportere ud af filen
export default Add_edit_Tenant;


// css yo
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});