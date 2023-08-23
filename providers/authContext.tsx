import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthSessionResult } from 'expo-auth-session';

const AuthContext = createContext({
    authToken: undefined as AuthSessionResult | undefined,
    setAuthToken: (_: SetStateAction<AuthSessionResult | undefined>) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<AuthSessionResult>();

    useEffect(() => {
        (async () => {
            const authSessionResultJson = await SecureStore.getItemAsync('authToken');
            const token: AuthSessionResult = authSessionResultJson ? JSON.parse(authSessionResultJson) : undefined;
            // check if token is expired
            if (token?.type !== 'success') {
                setAuthToken(undefined);
            }

            if (token) setAuthToken(token);
        })();
    }, []);

    useEffect(() => {
        if (authToken) {
            const authTokenJson = JSON.stringify(authToken);
            SecureStore.setItemAsync('authToken', authTokenJson);
        } else {
            SecureStore.deleteItemAsync('authToken');
        }
    }, [authToken]);

    return <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
