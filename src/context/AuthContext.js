import React from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext({ isLoggedIn: false });

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const login = async (password) => {
        const storedPassword = await SecureStore.getItemAsync('password');
        if (password !== storedPassword) {
            return false;
        } else {
            await SecureStore.setItemAsync('isLoggedIn', 'true')
            setIsLoggedIn(true);
            return true;
        }
    };
    const logout = async () => {
        await SecureStore.setItemAsync('isLoggedIn', 'false');
        setIsLoggedIn(false);
    };

    React.useEffect(() => {
        const setPasswordIfNotSet = async () => {
            const password = await SecureStore.getItemAsync('password');
            if (!password) {
                await SecureStore.setItemAsync('password', 'password');
            }
        };
        const updateLoginStatus = async () => {
            const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
            setIsLoggedIn(isLoggedIn === 'true');
        };

        setPasswordIfNotSet();
        updateLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };