import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const Welcome = () => {
    const [titleText, setTitleText] = useState("Welcome");
    const bodyText = "WelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcome" +
        "WelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcome" +
        "WelcomeWelcomeWelcomeWelcomeWelcomeWelcomeWelcome" +
        "Hilsen Christian Frø Hilsen Christian FrøHilsen Christian FrøHilsen Christian FrøHilsen Christian FrøHilsen Christian FrøHilsen Christian FrøHilsen Christian FrøHilsen Christian Frø" +
        "Hilsen Christian FrøHilsen Christian FrøHilsen Christian Frø";

    const onPressTitle = () => {
        setTitleText("WelcomeWelcome[pressed]");
    };

    return (
        <Text style={styles.baseText}>
            <Text style={styles.titleText} onPress={onPressTitle}>
                {titleText}
                {"\n"}
                {"\n"}
            </Text>
            <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
    );
};

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default Welcome;