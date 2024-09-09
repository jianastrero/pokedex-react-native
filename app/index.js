import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import {router} from "expo-router";
import MyTextInput from "../src/component/MyTextInput";
import MyButton from "../src/component/MyButton";

export default function Index() {
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <StatusBar style="auto" translucent={true}/>
            <Image
                source={require('../assets/images/pokedex_logo.png')}
                style={styles.pokedexLogo} />

            <MyTextInput
                value={password}
                onChangeText={setPassword}
                label="Enter your Password"
                isPassword={true}
                style={{ width: '80%', marginTop: 40 }} />

            <MyButton
                title="Login"
                onPress={() => router.replace('/(tabs)')}
                style={{ marginTop: 40 }}/>
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
    pokedexLogo: {
        width: '90%',
        height: 'auto',
        aspectRatio: 387/140,
        marginTop: 20
    }
});
