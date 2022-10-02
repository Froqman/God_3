import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// navigation til oprettede brugere
const FeedList = ({navigation}) => {

    const [feeds,setFeeds] = useState()
//callback
    useEffect(() => {
        if(!feeds) {
            firebase
                .database()
                .ref('/Feeds')
                .on('value', snapshot => {
                    setFeeds(snapshot.val())
                });
        }
    },[]);

    // er brugeren ikke oprettet hvis nada
    if (!feeds) {
        return <Text>Loading...</Text>;
    }
// handle funktion
    const handleSelectFeed= id => {
        /* søger  direkte vores arrayet af brugere og finder user objektet som matcher*/
        const feed = Object.entries(feeds).find( feed => feed[0] === id /*id*/)
        navigation.navigate('Feed Details', { feed });
    };

    // Flatlist vil have et  array. lLaves til et array [],så flatlist kan vises os listen.
    const feedArray = Object.values(feeds);
    const feedKeys = Object.keys(feeds);

    return (
        // react component
        <FlatList
            data={feedArray}
            // Vi bruger feedKeys så ID'et på den brugeren specifikt  og returnerer dette som key der bliver til ID på FeedListItem
            keyExtractor={(item, index) => feedKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectFeed(feedKeys[index])}>
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
export default FeedList;


// styling

const styles = StyleSheet.create({
    container: {
        flex: 2,
        borderWidth: 2,
        borderRadius:11,
        margin: 6,
        padding: 6,
        height: 53,
        justifyContent:'center',
        backgroundColor: 'red'
    },
    label: { fontWeight: 'bold' },
});