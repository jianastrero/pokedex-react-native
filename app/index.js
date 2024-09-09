import React from 'react';
import {StyleSheet, View} from 'react-native';
import {router, useFocusEffect} from "expo-router";

export default function Index() {
    useFocusEffect(() => {
        router.replace('/login');
    });

    return (
        <View style={styles.container}>
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
