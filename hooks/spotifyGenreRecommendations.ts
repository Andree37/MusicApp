const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Fetch available genre seeds for recommendations
async function fetchAvailableGenreSeeds(authToken: string) {
    const response = await fetch(`${SPOTIFY_API_URL}/recommendations/available-genre-seeds`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data.genres;
}

// Fetch a song recommendation for a given genre
async function fetchSongRecommendationForGenre(authToken: string, genre: string) {
    const response = await fetch(`${SPOTIFY_API_URL}/recommendations?seed_genres=${genre}&limit=1`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data.tracks[0]; // returning the first song recommendation for the given genre
}

async function fetchAllRecommendations(authToken: string) {
    const genres = await fetchAvailableGenreSeeds(authToken);
    const recommendationPromises = genres.map((genre: string) => fetchSongRecommendationForGenre(authToken, genre));

    return Promise.all(recommendationPromises);
}

export default function useSpotifyGenreRecommendations(authToken: string) {
    return fetchAllRecommendations(authToken);
}
