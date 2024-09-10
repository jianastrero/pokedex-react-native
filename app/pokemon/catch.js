import React from 'react';
import {ImageBackground, StyleSheet} from "react-native";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {router} from "expo-router";
import {usePokemons} from "../../src/context/PokemonContext";

export default function CatchPokemonScreen() {
    const { randomPokemon, addCaughtPokemon } = usePokemons();
    const [pokemon, setPokemon] = React.useState(null);

    React.useEffect(() => {
        setPokemon(randomPokemon());
    }, []);

    const pokemonCaught = () => {
        console.log('You caught a Pokemon!');
        addCaughtPokemon(pokemon.id);
        router.replace(`pokemon/caught/${pokemon.id}`);
    };

    const pokeballValues = useSharedValue({
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1
    });
    const pokemonValues = useSharedValue({
        opacity: 1
    });

    const smoothConfig = {
        duration: 500,
        easing: Easing.bezier(0.5, 0, 0.5, 1)
    };

    const instantConfig = {
        duration: 1,
        easing: Easing.linear
    };

    const pokeballPanStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(pokeballValues.value.x, instantConfig),
                },
                {
                    translateY: withTiming(pokeballValues.value.y, instantConfig),
                },
                {
                    rotate: `${pokeballValues.value.rotation}deg`
                },
                {
                    scale: withTiming(pokeballValues.value.scale, instantConfig)
                }
            ]
        }
    });

    const pokemonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(pokemonValues.value.opacity, smoothConfig)
        }
    });

    const pokeballPan = Gesture.Pan()
        .onChange(event => {
            let rotation = pokeballValues.value.rotation + Math.abs(event.changeX) + Math.abs(event.changeY);
            rotation = rotation % 360;

            pokeballValues.value = {
                x: pokeballValues.value.x + event.changeX,
                y: pokeballValues.value.y + event.changeY,
                rotation: rotation,
                scale: 1
            };
        })
        .onFinalize(() => {
            pokeballValues.value = withTiming(
                {
                    x: 0,
                    y: -400,
                    rotation: 3600,
                    scale: 0.4
                },
                smoothConfig,
                finished => {
                    if (finished) {
                        pokemonValues.value = withTiming(
                            { opacity: 0 },
                            smoothConfig,
                            finished => {
                                if (finished) {
                                    runOnJS(pokemonCaught)();
                                }
                            });
                    }
                }
            );
        });

    return (
        <ImageBackground
            source={require('../../assets/images/pokemon_bg.png')}
            style={{width: '100%', height: '100%'}}>
            {/*<StatusBar style="auto" translucent={true}/>*/}

            <GestureHandlerRootView style={styles.container}>
                <Animated.Image
                    source={{ uri: pokemon?.image.hi_res }}
                    style={[styles.pokemon, pokemonStyle]} />

                <GestureDetector gesture={pokeballPan}>
                    <Animated.Image
                        source={require('../../assets/images/pokeball.png')}
                        style={[styles.pokeball, pokeballPanStyle]} />
                </GestureDetector>
            </GestureHandlerRootView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokeball: {
        position: 'absolute',
        bottom: 100,
        width: 150,
        height: 150,
    },
    pokemon: {
        position: 'absolute',
        top: 150,
        width: '80%',
        height: 'auto',
        aspectRatio: 1,
    }
});
