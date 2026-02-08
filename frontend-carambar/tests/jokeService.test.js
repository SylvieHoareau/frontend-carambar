import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jokeService } from '../src/services/jokeServices.js';

// On simule fetch car on est dans un environnement Node (Vitest)
global.fetch = vi.fn();

describe('jokeService', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('devrait récupérer toutes les blagues', async () => {
        // Simulation de la réponse API (Mock)
        const mockJokes = [{ id: 1, question: 'Quelle est la blague ?', response: 'La réponse !' }, { id: 2, content: 'Blague 2' }];
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockJokes,
        });

        const jokes = await jokeService.getAllJokes();
        // Vérifications
        expect(jokes).toEqual(mockJokes);
        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/jokes`);
    });

    it('getAllJokes devrait lancer une erreur si la réponse est KO', async () => {
        fetch.mockResolvedValue({ ok: false });

        await expect(jokeService.getAllJokes()).rejects.toThrow('Erreur lors de la récupération des blagues');
    });

    it('devrait récupérer des blagues aléatoires', async () => {
        const mockRandomJokes = [{ id: 3, question: 'Quelle est la blague ?', response: 'La réponse !' }];
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockRandomJokes,
        });

        const randomJokes = await jokeService.getRandomJokes(1);
        expect(randomJokes).toEqual(mockRandomJokes);
        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/jokes/random?count=1`);
    });

    it('createJoke devrait envoyer une requête POST avec les bonnes données', async () => {
        const newJoke = { question: "Blague ?", response: "Réponse !" };
        
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ id: 10, ...newJoke }),
        });

        const result = await jokeService.createJoke(newJoke);

        expect(result).toEqual({ id: 10, ...newJoke });
        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/jokes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJoke),
        });
        expect(result.id).toBe(10);
    });
});