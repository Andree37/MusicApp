import React, { useEffect, useState } from 'react';
import { Button, Image, Spinner, Text, View } from 'tamagui';
import { StyleSheet } from 'react-native';
import useSpotifyAuth from '@/hooks/spotifyAuth';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

async function saveTokenToSecureStore(token: string) {
    await SecureStore.setItemAsync('spotifyAuthToken', token);
}

async function getTokenFromSecureStore() {
    return SecureStore.getItemAsync('spotifyAuthToken');
}

export default function LoginForm() {
    const { promptAsync } = useSpotifyAuth();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await getTokenFromSecureStore();
            setToken(storedToken);
            setLoading(false);
        }

        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            router.replace('/(tabs)/one');
        }
    }, [token]);

    if (loading) {
        return <Spinner size="large" color="$orange10" />;
    }

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/bytebeagle.png')} style={styles.logo} />

            <View style={styles.spotifyButtonContainer}>
                <Button
                    style={styles.spotifyButton}
                    onPress={async () => {
                        const r = await promptAsync();
                        if (r.type === 'success') {
                            await saveTokenToSecureStore(r.params.access_token);
                            setToken(r.params.access_token);
                        }
                    }}
                >
                    <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
                </Button>
            </View>

            <Text style={styles.disclaimerText}>
                By logging in, you agree to our <Text style={styles.linkText}>terms of service</Text>.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF', // change to desired bg color
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 50,
    },
    spotifyButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    spotifyButton: {
        backgroundColor: '#1DB954', // Spotify's green color
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
    },
    spotifyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disclaimerText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'grey',
    },
    linkText: {
        textDecorationLine: 'underline',
    },
});
