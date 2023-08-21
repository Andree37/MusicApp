import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Ensure that you initialize the WebBrowser:
WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function useSpotifyAuth() {
    const redirectUri = makeRedirectUri();
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
            scopes: ['user-read-private', 'playlist-modify-public'], // Add more as needed
            redirectUri,
            responseType: 'token',
        },
        discovery,
    );

    return {
        request,
        response,
        promptAsync,
    };
}
