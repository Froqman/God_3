//importere relevant.
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
// routing/navagation
const FeedDetails = ({route,navigation}) => {
    const [feed,setFeed] = useState({});
//callback
    useEffect(() => {
        /*Henter forbruger værdier og indsætter*/
        setFeed(route.params.feed[1]);

        /*clean screen efter brug*/
        return () => {
            setFeed({})
        }
    });
// opdater/rediger
    const makeEdit = () => {
        //Navigerer til EditFeed skærmen og sender feed videre
        const feed = route.params.feed
        navigation.navigate('Edit Feed', { feed });
    };

    // Klassisk er du sikker på, at du vil gennemføre handlingen?
    const verifyDelete = () => {
        /*platform iphone eller noget android halløj?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('sure?', 'Delete the feed?', [
                { text: 'Cancel', style: 'cancel' },
                // this.handleDelete = eventHandler til onPress når button trykkes
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Sletter Feed
    const  handleDelete = () => {
        const id = route.params.feed[0];
        try {
            firebase
                .database()
                // Vi sætter  ID ind i referencen
                .ref(`/Feeds/${id}`)
                // Og fjerner data derfra
                .remove();
            // goBack når handlingen er udført eller overstået
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

// if statement til mangel eventuelt
    if (!feed) {
        return <Text>No data</Text>;
    }

    //Buttons for endpoints delete og update
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => makeEdit()} />
            <Button title="Delete" onPress={() => verifyDelete()} />
            {
                Object.entries(feed).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores feed keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores feed values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default FeedDetails;

// css styling yo
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 6,
        padding: 6,
        flexDirection: 'row',
    },
    label: { width: 111, fontWeight: 'bold' },
    value: { flex: 2 },
});