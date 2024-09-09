import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MyButton from "../../src/component/MyButton";
import {router} from "expo-router";
import {useAuth} from "../../src/context/AuthContext";

export default function SettingsScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <MyButton
                title='Logout'
                onPress={() => {
                    logout().then(() => {
                        router.replace('/login');
                    });
                }}/>
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
