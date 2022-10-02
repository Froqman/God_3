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

const Add_edit_Tenant = ({navigation,route}) => {

    const initialState = {
        brand: '',
        model: '',
        year: '',
        licensePlate: ''
    }

    const [newTenant,setNewTenant] = useState(initialState);

    /*Returnere true, hvis vi er på edit tenant*/
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

    const handleSave = () => {

        const { brand, model, year, licensePlate } = newTenant;

        if(brand.length === 0 || model.length === 0 || year.length === 0 || licensePlate.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditTenant){
            const id = route.params.tenant[0];
            try {
                firebase
                    .database()
                    .ref(`/Tenants/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ brand, model, year, licensePlate });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const tenant = [id,newTenant]
                navigation.navigate("Tenant Details",{tenant});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Tenants/')
                    .push({ brand, model, year, licensePlate });
                Alert.alert(`Saved`);
                setNewTenant(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

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
                {/*Hvis vi er inde på edit tenant, vis save changes i stedet for add tenant*/}
                <Button title={ isEditTenant ? "Save changes" : "Add tenant"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Tenant;

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