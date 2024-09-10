import React from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator, Button, FlatList} from "react-native";
import {usePokemons} from "../../src/context/PokemonContext";
import * as FileSystem from 'expo-file-system';


export default function PokemonsScreen() {
    const { allPokemons, updatePokemonList, updatePokemon } = usePokemons();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        if (isLoading) {
            updatePokemonList().then(() => {
                setIsLoading(false);
            });
        }
    }, []);

    React.useEffect(() => {
        if (allPokemons.length > 0) {
            console.log('allPokemons', allPokemons.length);
            console.log('allPokemons[0]', allPokemons[0]);
            console.log('allPokemons[0]', allPokemons[0].id);
            console.log('allPokemons[0]', allPokemons[0].name.english);
            console.log('allPokemons[0].image.hi_res', allPokemons[0].image.hi_res);
            FileSystem.getInfoAsync(allPokemons[0].image.hi_res).then((fileInfo) => {
                console.log('fileInfo', fileInfo);
            });
        }
    }, [allPokemons]);

    return (
        <View style={styles.container}>
            {allPokemons.length === 0 || isLoading ? (
                <ActivityIndicator size="large" color="#ff0000" />
            ) : (
                <View>
                    <Text>{allPokemons.length} Pokemons</Text>
                    <Image source={{ uri: allPokemons[0].image.hi_res }} style={{ width: 250, height: 250 }} />
                    <Text style={{ fontSize: 24 }}>{allPokemons[0].name.english}</Text>
                    <Button
                        title='Update name'
                        onPress={() => {
                            const pokemon = allPokemons[0];
                            const newName = pokemon.name.english + ' ' + (Math.random() * 10).toFixed(0);
                            console.log('newName', newName);
                            console.log('pokemon.id', pokemon.id);
                            updatePokemon({ id: pokemon.id, name: newName });
                        }} />

                    <FlatList
                        data={allPokemons}
                        renderItem={() => {

                        }} />
                </View>
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
