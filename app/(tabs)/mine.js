import React from "react";
import {View, Text, StyleSheet, Button, StatusBar, FlatList, TouchableOpacity, Image} from "react-native";
import {router} from "expo-router";
import MyButton from "../../src/component/MyButton";
import {usePokemons} from "../../src/context/PokemonContext";

export default function MineScreen() {
    const { caughtPokemons, updateCaughtPokemons } = usePokemons();

    React.useEffect(() => {
        updateCaughtPokemons();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={false} />
            {caughtPokemons.length === 0 ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 24 }}>No Caught Pokemons yet!</Text>
                </View>
            ) : (
                <View style={{width: '100%', flex: 1}}>
                    <FlatList
                        data={caughtPokemons}
                        renderItem={({ index, item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push(`/pokemon/${item.id}`);
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        backgroundColor: index % 2 === 0 ? '#f0a0a0' : '#ffffff',
                                    }}>
                                    <Image source={{ uri: item.image.sprite }} style={{ width: 100, height: 100 }} />
                                    <Text style={{ fontSize: 24, flex: 1 }}>{item.name.english}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        style={{ height: '100%', width: '100%' }}/>
                </View>
            )}

            <MyButton
                title='Catch Pokemon'
                onPress={() => router.push('/pokemon/catch')}
                style={{ width: '80%', marginVertical: 24 }}/>
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
