import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {router} from "expo-router";

export default function MineScreen() {
    return (
        <View style={styles.container}>
            <Text>Mine Screen</Text>
            <Button title='Catch Pokemon' onPress={() => router.push('/pokemon/catch')} />
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
