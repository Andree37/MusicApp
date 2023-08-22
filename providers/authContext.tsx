import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({
    authToken: '',
    setAuthToken: (_: SetStateAction<string>) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<string>('');

    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) setAuthToken(token);
        })();
    }, []);

    useEffect(() => {
        if (authToken) {
            SecureStore.setItemAsync('authToken', authToken);
        } else {
            SecureStore.deleteItemAsync('authToken');
        }
    }, [authToken]);

    return <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
