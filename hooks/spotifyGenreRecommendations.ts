import { Track } from '@/types/TrackRecommendations';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const MAX_GENRES = 5;

// Fetch available genre seeds for recommendations
async function fetchAvailableGenreSeeds(authToken: string): Promise<string[]> {
    const response = await fetch(`${SPOTIFY_API_URL}/recommendations/available-genre-seeds`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.status === 429) {
        return [];
    }

    // return only MAX_GENRES genres
    return data.genres.slice(0, MAX_GENRES);
}

// Fetch a song recommendation for a given genre
async function fetchSongRecommendationForGenre(
    authToken: string,
    genre: string,
): Promise<{ song: Track; genre: string } | null> {
    const response = await fetch(`${SPOTIFY_API_URL}/recommendations?seed_genres=${genre}&limit=1`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.status === 429) {
        return null;
    }

    return { song: data.tracks[0], genre }; // returning the first song recommendation for the given genre
}

async function fetchAllRecommendations(authToken: string): Promise<Awaited<{ song: Track; genre: string } | null>[]> {
    const genres = await fetchAvailableGenreSeeds(authToken);
    const recommendationPromises = genres?.map((genre: string) => fetchSongRecommendationForGenre(authToken, genre));

    return Promise.all(recommendationPromises);
}

export default function useSpotifyGenreRecommendations(
    authToken: string,
): Promise<Awaited<{ song: Track; genre: string } | null>[]> {
    return fetchAllRecommendations(authToken);
}
