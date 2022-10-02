import * as React from 'react';
//ui
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
// database
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// konstant for skemaet/klasse variationen til ny bruger
const Add_edit_Feed = ({navigation,route}) => {

    //user information
    const initialState = {
        Post: '',
        subject: '',
        info: ''
    }
// start på ny bruger
    const [newFeed,setNewFeed] = useState(initialState);

    /*true når tenant skal redigeres*/
    const isEditFeed = route.name === "Edit Feed";
// callback
    useEffect(() => {
        if(isEditFeed){
            const feed = route.params.feed[1];
            setNewFeed(feed)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewFeed(initialState)
        };
    }, []);
//funktion for new user
    const changeTextInput = (name,event) => {
        setNewFeed({...newFeed, [name]: event});
    }
// gem ny bruger
    const handleSave = () => {

        const { Post, subject, info} = newFeed;

        // requirements for ny bruger tegn.
        if(Post.length === 0 || subject.length === 0 || info.length === 0  ){
            return Alert.alert('Empty field!');
        }
// gemmes i firebase database.
        if(isEditFeed){
            const id = route.params.feed[0];
            try {
                firebase
                    .database()
                    .ref(`/Feeds/${id}`).update({ Post, subject, info });
                // Når feed er opdateret = back 2 start. // update, så kun de felter der redigeres opdateres i databasen.
                Alert.alert("Din profil er opdateret, vend tilbage til start");
                const feed = [id,newFeed]
                navigation.navigate("Feed Details",{feed});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
// else statement
        }else{
            // requesten fra endpoint til databasen.
            try {
                firebase
                    .database().ref('/Feeds/').push({ Post, subject, info });
                Alert.alert(`Saved`);
                setNewFeed(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }// fanger fejl
        }

    };
// button for feed der skal addes eller redigeres med homescreen
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                { //array og callback
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newFeed[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Ny bruger vises "add feed" eller changes are saved, hvis der redigeres*/}
                <Button title={ isEditFeed ? "changes are saved" : "Add Feed"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

// eksportere ud af filen
export default Add_edit_Feed;

// css yo
const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 33,
        margin: 11,
    },
    label: {
        fontWeight: 'bold',
        width: 111
    },
    input: {
        borderWidth: 2,
        padding:6,
        flex: 2
    },
});