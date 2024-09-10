import React from "react";
import {View, Text, StyleSheet, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, Image} from "react-native";
import {usePokemons} from "../../src/context/PokemonContext";
import {router} from "expo-router";
import MyButton from "../../src/component/MyButton";

export default function FavoritesScreen() {
    const { allPokemons, toggleFavorite } = usePokemons();
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        setFavorites(allPokemons.filter(p => p.isFavorite));
    }, [allPokemons]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={false} />
            {favorites.length === 0 ? (
                <Text style={{ fontSize: 24 }}>No favorites yet!</Text>
            ) : (
                <View style={{width: '100%'}}>
                    <FlatList
                        data={favorites}
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
