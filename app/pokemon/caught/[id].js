import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {usePokemons} from "../../../src/context/PokemonContext";
import MyButton from "../../../src/component/MyButton";

export default function PokemonCaughtScreen() {
    const { id } = useLocalSearchParams();
    const { getPokemonById } = usePokemons();
    const [pokemon, setPokemon] = React.useState(null);

    React.useState(() => {
        setPokemon(getPokemonById(id));
    }, [id]);

    return (
        <View style={styles.container}>
            <Image source={{ uri: pokemon?.image?.hi_res }} style={{ width: 250, height: 250 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>You caught {pokemon?.name?.english}!</Text>
            <MyButton title='Back to My Pokemons' onPress={() => router.push('/(tabs)/mine')} />
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
