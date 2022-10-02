import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const TenantDetails = ({route,navigation}) => {
    const [tenant,setTenant] = useState({});

    useEffect(() => {
        /*Henter tenant values og sætter dem*/
        settenant(route.params.tenant[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setTenant({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditTenant skærmen og sender bilen videre med
        const tenant = route.params.tenant
        navigation.navigate('Edit Tenant', { tenant });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the tenant?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter den aktuelle bil
    const  handleDelete = () => {
        const id = route.params.tenant[0];
        try {
            firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref(`/Tenants/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!tenant) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(tenant).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores tenant keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores tenant values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default TenantDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});