import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Button,
    FlatList,
    StatusBar,
    TouchableOpacity
} from "react-native";
import {usePokemons} from "../../src/context/PokemonContext";
import * as FileSystem from 'expo-file-system';
import MyButton from "../../src/component/MyButton";
import {router} from "expo-router";


export default function PokemonsScreen() {
    const { allPokemons, updatePokemonList, deletePokemon, toggleFavorite } = usePokemons();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        if (isLoading) {
            updatePokemonList().then(() => {
                setIsLoading(false);
            });
        }
    }, []);

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
                                    <MyButton
                                        title={ item.isFavorite ? '❤️' : '🤍' }
                                        onPress={() => toggleFavorite(item.id)}
                                        style={{ backgroundColor: 'transparent', borderColor: 'black' }}/>
                                    <MyButton
                                        title='🗑️'
                                        onPress={() => deletePokemon(item.id)}
                                        style={{ marginEnd: 10, backgroundColor: 'transparent' }}/>
                                </TouchableOpacity>
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
