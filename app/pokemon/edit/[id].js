import React from "react";
import {View, Text, StyleSheet, ActivityIndicator, ScrollView} from "react-native";
import {router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import {usePokemons} from "../../../src/context/PokemonContext";
import MyTextInput from "../../../src/component/MyTextInput";
import MyButton from "../../../src/component/MyButton";

export default function PokemonEditScreen() {
    const { id } = useLocalSearchParams();
    const { getPokemonById, updatePokemon } = usePokemons();
    const [pokemon, setPokemon] = React.useState(null);

    React.useEffect(() => {
        const p = getPokemonById(id);
        setPokemon(p);
    }, []);

    return (
        <View style={styles.container}>
            {pokemon ? (
                <ScrollView style={{ width: '100%', height: '100%' }}>
                    <MyTextInput
                        label='Name'
                        value={pokemon.name.english}
                        onChangeText={(text) => {
                            setPokemon({ ...pokemon, name: { english: text } });
                        }}
                    />
                    <MyButton title='Save' onPress={() => {
                        updatePokemon({ id: id, name: pokemon.name.english})
                        router.back();
                    }} />
                </ScrollView>
            ) : (
                <ActivityIndicator size="large" color="#ff0000" />
            )}
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
