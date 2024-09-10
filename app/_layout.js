import {Stack} from "expo-router";
import {AuthProvider} from "../src/context/AuthContext";
import {PokemonProvider} from "../src/context/PokemonContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <PokemonProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="pokemon/[id]" options={{
                        title: 'Pokemon Details',
                        headerShown: true
                    }} />
                    <Stack.Screen name="pokemon/edit/[id]" options={{
                        title: 'Pokemon Details',
                        headerShown: true
                    }} />
                    <Stack.Screen name="pokemon/catch" options={{
                        title: 'Gotta Catch \'Em All!',
                        headerShown: true,
                    }} />
                    <Stack.Screen name="pokemon/caught/[id]" options={{
                        title: 'Caught a new pokemon!',
                        headerShown: true,
                    }} />
                </Stack>
            </PokemonProvider>
        </AuthProvider>
    );
}