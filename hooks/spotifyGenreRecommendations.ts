import { Track } from '@/types/TrackRecommendations';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const MAX_GENRES = 5;

export type Recommendations = { song: Track | null; genre: string };

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
    if (data.genres) {
        return data.genres.slice(0, MAX_GENRES);
    }
    return [];
}

// Fetch a song recommendation for a given genre
async function fetchSongRecommendationForGenre(authToken: string, genre: string): Promise<Recommendations> {
    const response = await fetch(`${SPOTIFY_API_URL}/recommendations?seed_genres=${genre}&limit=1`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.status === 429) {
        return { song: null, genre };
    }

    return { song: data.tracks[0], genre }; // returning the first song recommendation for the given genre
}

async function fetchAllRecommendations(authToken: string): Promise<Awaited<Recommendations>[]> {
    const genres = await fetchAvailableGenreSeeds(authToken);
    const recommendationPromises = genres?.map((genre: string) => fetchSongRecommendationForGenre(authToken, genre));

    return Promise.all(recommendationPromises);
}

export default function useSpotifyGenreRecommendations(authToken: string): Promise<Awaited<Recommendations>[]> {
    return fetchAllRecommendations(authToken);
}
