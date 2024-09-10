import React from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator} from "react-native";
import {usePokemons} from "../../src/context/PokemonContext";
import * as FileSystem from 'expo-file-system';

export default function PokemonsScreen() {
    const { allPokemons, updatePokemonList } = usePokemons();
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
