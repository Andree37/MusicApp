import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Spinner, Text, View } from 'tamagui';
import { StyleSheet } from 'react-native';
import useSpotifyAuth from '@/hooks/spotifyAuth';
import { router } from 'expo-router';
import AuthContext from '@/providers/authContext';

export default function LoginForm() {
    const { authToken, setAuthToken } = useContext(AuthContext);
    const { promptAsync } = useSpotifyAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authToken) {
            router.replace('/(tabs)/one');
        } else {
            setLoading(false);
        }
    }, [authToken]);

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
                            const response = await fetch('http://localhost:3000/api/spotify/exchange', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    code: r.params.code,
                                }),
                            });
                            if (response.ok) {
                                setAuthToken(r);
                            }
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
