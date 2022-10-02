import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const TenantList = ({navigation}) => {

    const [tenants,setTenants] = useState()

    useEffect(() => {
        if(!tenantsenants) {
            firebase
                .database()
                .ref('/Tenants')
                .on('value', snapshot => {
                    setTenants(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!tenants) {
        return <Text>Loading...</Text>;
    }

    const handleSelectTenant = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const tenant = Object.entries(tenants).find( tenant => tenant[0] === id /*id*/)
        navigation.navigate('Tenant Details', { car });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores tenant objekt, og bruger som array til listen
    const tenantArray = Object.values(tenants);
    const tenantKeys = Object.keys(tenants);

    return (
        <FlatList
            data={tenantArray}
            // Vi bruger tenantKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
            keyExtractor={(item, index) => tenantKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectTenant(tenantKeys[index])}>
                        <Text>
                            {item.brand} {item.model}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default TenantList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});