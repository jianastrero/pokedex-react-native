import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {router, useFocusEffect} from "expo-router";
import {useAuth} from "../src/context/AuthContext";

export default function Index() {
    const { isLoggedIn } = useAuth();

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoggedIn) {
                router.replace('/(tabs)');
            } else {
                router.replace('/login');
            }
        }, 1_000);

        return () => clearTimeout(timeout);
    }, [isLoggedIn]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/pokedex_logo.png')}
                style={styles.pokedexLogo} />

            <ActivityIndicator size="large" color="#ff0000" />
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
