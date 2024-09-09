import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

export default function PokemonCaughtScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>You caught a Pokemon {id}!</Text>
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
