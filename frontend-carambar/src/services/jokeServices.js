const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const jokeService = {
    // Récupérer toutes les blagues
    async getAllJokes() {
        const response = await fetch(`${API_URL}/jokes`);
        if (!response.ok) {
            throw new Error('Failed to fetch jokes');
        }
        return await response.json();
    },

    // Ajouter une nouvelle blague
    async createJoke(jokeData) {
        const response = await fetch(`${API_URL}/jokes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeData),
        });
        if (!response.ok) {
            throw new Error('Failed to create joke');
        }
        return await response.json();
    }
};