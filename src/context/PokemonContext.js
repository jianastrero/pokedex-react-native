import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Constants} from "../Constants";
import * as FileSystem from 'expo-file-system';

const PokemonContext = React.createContext();

const downloadImage = async (domain, fileName) => {
    const newFileName = fileName.substring(1, fileName.length);
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'image', { intermediates: true });
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'image/sprite', { intermediates: true });
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'image/thumbnail', { intermediates: true });
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'image/hi_res', { intermediates: true });
    const fileUri = FileSystem.documentDirectory + newFileName;
    let fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
        console.log('saved:', fileInfo.uri);
        return fileInfo.uri;
    }

    console.log('downloading:', domain + newFileName);
    const { uri } = await FileSystem.downloadAsync(
        domain + newFileName,
        fileUri
    );
    console.log('downloaded:', fileUri);
    return fileUri;
}

function PokemonProvider({ children }) {
    const [allPokemons, setAllPokemons] = React.useState([]);
    const [caughtPokemons, setCaughtPokemons] = React.useState([]);

    const updatePokemonList = async () => {
        // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'image', { idempotent: true });
        // await AsyncStorage.clear();
        // return true;
        const allPokemonsJson = await AsyncStorage.getItem("allPokemons");
        if (allPokemonsJson) {
            console.log('allPokemonsJson', allPokemonsJson);
            const allPokemonList = JSON.parse(allPokemonsJson);
            console.log('allPokemonList', allPokemonList);
            setAllPokemons(allPokemonList);
            console.log('saved pokemons', allPokemonList.length);
            return true;
        }


        const response = await fetch(`${Constants.domain}pokemon`);
        const list = await response.json();
        const allPokemonList = [];
        for (let i = 0; i < list.length; i++) {
            // if (i === 1) break;
            const pokemon = list[i];
            const sprite = await downloadImage(Constants.domain, pokemon['image']['sprite']);
            const thumbnail = await downloadImage(Constants.domain, pokemon['image']['thumbnail']);
            const hi_res = await downloadImage(Constants.domain, pokemon['image']['hi_res']);
            allPokemonList.push({
                ...pokemon,
                image: {
                    sprite,
                    thumbnail,
                    hi_res
                }
            });
            // console.log('pokemon', pokemon);
        }
        const json = JSON.stringify(allPokemonList);
        console.log('json', json);
        const newList = JSON.parse(json);
        setAllPokemons(newList);
        console.log('fetched pokemons', newList.length);
        AsyncStorage.setItem('allPokemons', JSON.stringify(newList));
        return true;
    };

    const getPokemonById = (id) => {
        return allPokemons.find(pokemon => String(pokemon.id) === String(id));
    };

    const updatePokemon = ({ id, name }) => {
        const pokemon = getPokemonById(id);
        console.log('updatePokemon', id, name, pokemon);
        if (pokemon) {
            pokemon.name.english = name;
            setAllPokemons([...allPokemons]);

            AsyncStorage.setItem('allPokemons', JSON.stringify(allPokemons));
        }
    };

    const toggleFavorite = (id) => {
        const pokemon = getPokemonById(id);
        if (pokemon) {
            if (pokemon.isFavorite === undefined) {
                pokemon.isFavorite = true;
            } else {
                pokemon.isFavorite = !pokemon.isFavorite;
            }
            setAllPokemons([...allPokemons]);

            AsyncStorage.setItem('allPokemons', JSON.stringify(allPokemons));
        }
    };

    const deletePokemon = (id) => {
        const pokemon = getPokemonById(id);
        if (pokemon) {
            const index = allPokemons.indexOf(pokemon);
            allPokemons.splice(index, 1);
            setAllPokemons([...allPokemons]);

            AsyncStorage.setItem('allPokemons', JSON.stringify(allPokemons));
        }
    };

    const randomPokemon = () => {
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        return allPokemons[randomIndex];
    };

    const addCaughtPokemon = (id) => {
        const caughtPokemon = allPokemons.find(p => String(p.id) === String(id));
        if (caughtPokemon) {
            const newList = [...caughtPokemons, caughtPokemon];
            setCaughtPokemons(newList);
            AsyncStorage.setItem('caughtPokemons', JSON.stringify(newList));
        }
    };

    const updateCaughtPokemons = async () => {
        const caughtPokemonsJson = await AsyncStorage.getItem('caughtPokemons');
        if (caughtPokemonsJson) {
            const caughtPokemonList = JSON.parse(caughtPokemonsJson);
            setCaughtPokemons(caughtPokemonList);
        }
    };

    return (
        <PokemonContext.Provider value={{
            allPokemons,
            updatePokemonList,
            updatePokemon,
            deletePokemon,
            getPokemonById,
            toggleFavorite,
            randomPokemon,
            caughtPokemons,
            addCaughtPokemon,
            updateCaughtPokemons
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

const usePokemons = () => React.useContext(PokemonContext);

export { PokemonProvider, usePokemons };