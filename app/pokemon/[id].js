import React from "react";
import {View, Text, StyleSheet, ActivityIndicator, Image, ScrollView} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {usePokemons} from "../../src/context/PokemonContext";
import MyButton from "../../src/component/MyButton";

export default function ViewPokemon() {
    const { id } = useLocalSearchParams();
    const { getPokemonById } = usePokemons();
    const [pokemon, setPokemon] = React.useState(null);

    React.useEffect(() => {
        const p = getPokemonById(id);
        setPokemon(p);
    }, []);

    return (
        <View style={styles.container}>
            {pokemon ? (
                <ScrollView style={styles.container}>
                    <Image
                        source={{ uri: pokemon.image.hi_res }}
                        style={{ width: 250, height: 250, alignSelf: 'center' }} />
                    <Text style={{ fontSize: 64, textAlign: 'center', fontWeight: 'bold' }}>{pokemon.name.english}</Text>
                    <Text style={{ fontSize: 24, textAlign: 'justify', marginHorizontal: 32 }}>{pokemon.description}</Text>

                    <MyButton title='Edit Pokemon' onPress={() => router.push(`/pokemon/edit/${id}`)} />
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
    },
});
