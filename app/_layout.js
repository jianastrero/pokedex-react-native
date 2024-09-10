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
                </Stack>
            </PokemonProvider>
        </AuthProvider>
    );
}