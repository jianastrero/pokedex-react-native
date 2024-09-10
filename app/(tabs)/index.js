import React from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator, Button, FlatList, StatusBar} from "react-native";
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
            <StatusBar barStyle="dark-content" translucent={false} />
            {allPokemons.length === 0 || isLoading ? (
                <ActivityIndicator size="large" color="#ff0000" />
            ) : (
                <View style={{width: '100%'}}>
                    <FlatList
                        data={allPokemons}
                        renderItem={({ index, item }) => {
                            return (
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    backgroundColor: index % 2 === 0 ? '#f0a0a0' : '#ffffff',
                                }}>
                                    <Image source={{ uri: item.image.sprite }} style={{ width: 100, height: 100 }} />
                                    <Text style={{ fontSize: 24, flex: 1 }}>{item.name.english}</Text>
                                </View>
                            );
                        }}
                    style={{ height: '100%', width: '100%' }}/>
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
