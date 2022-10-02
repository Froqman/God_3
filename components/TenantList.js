import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// navigation til oprettede brugere
const TenantList = ({navigation}) => {

    const [tenants,setTenants] = useState()

    useEffect(() => {
        if(!tenants) {
            firebase
                .database()
                .ref('/Tenants')
                .on('value', snapshot => {
                    setTenants(snapshot.val())
                });
        }
    },[]);

    // er brugeren ikke oprettet hvis nada
    if (!tenants) {
        return <Text>Loading...</Text>;
    }
// handle
    const handleSelectTenant = id => {
        /* søger  direkte vores arrayet af brugere og finder user objektet som matcher*/
        const tenant = Object.entries(tenants).find( tenant => tenant[0] === id /*id*/)
        navigation.navigate('Tenant Details', { tenant });
    };

    // Flatlist vil have et  array. lLaves til et array [],så flatlist kan vises os listen.
    const tenantArray = Object.values(tenants);
    const tenantKeys = Object.keys(tenants);

    return (
        <FlatList
            data={tenantArray}
            // Vi bruger tenantKeys så ID'et på den brugeren specifikt  og returnerer dette som key der bliver til ID på TenantListItem
            keyExtractor={(item, index) => tenantKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectTenant(tenantKeys[index])}>
                        <Text>
                            {item.lastName} {item.address}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}
//eksportere til andre filer/mapper
export default TenantList;


// styling

const styles = StyleSheet.create({
    container: {
        flex: 2,
        borderWidth: 2,
        borderRadius:11,
        margin: 6,
        padding: 6,
        height: 53,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});