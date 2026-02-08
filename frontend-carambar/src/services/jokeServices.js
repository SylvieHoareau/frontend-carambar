const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const jokeService = {
    // Récupérer toutes les blagues
    async getAllJokes() {
        const response = await fetch(`${API_URL}/jokes`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des blagues');
        }
        return await response.json();
    },

    // Récupérer les blagues aléatoires
    async getRandomJokes(count = 5) {
        const response = await fetch(`${API_URL}/jokes/random?count=${count}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des blagues aléatoires');
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
            throw new Error('Erreur lors de la création de la blague');
        }
        return await response.json();
    }
};