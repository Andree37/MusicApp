const BACKEND_URL = 'http://localhost:3000/api/songs';

// Fetch songs of the day for a specific genre
async function fetchNewDailySongs(): Promise<string[]> {
    const response = await fetch(`${BACKEND_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            genre: 'metal',
        }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 429) {
        return [];
    }

    return data;
}

export default function useSpotifyGenerateDailySongs(): Promise<string[]> {
    return fetchNewDailySongs();
}
