import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MyButton from "../../src/component/MyButton";
import {router} from "expo-router";

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <MyButton
                title='Logout'
                onPress={() => router.replace('/login')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
