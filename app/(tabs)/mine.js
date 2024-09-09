import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function MineScreen() {
    return (
        <View style={styles.container}>
            <Text>Mine Screen</Text>
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
