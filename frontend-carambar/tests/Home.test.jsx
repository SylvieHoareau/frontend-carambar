import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../src/app/page.jsx';
import { jokeService } from '../src/services/jokeServices.js';

// On simule jokeService pour contrôler les données retournées
vi.mock('@/services/jokeServices', () => ({
    jokeService: {
        getRandomJokes: vi.fn(),
        getAllJokes: vi.fn(),
    },
}));

describe('Home Component', () => {
    it('devrait afficher un message de chargement initialement', () => {
        render(<Home />);
        expect(screen.getByText(/Chargement des blagues.../i)).toBeInTheDocument();
    });

    it('affiche une blague après le chargement', async () => {
        const mockJoke = [{ id: 1, question: 'Blague aléatoire 1', response: 'Réponse de la blague 1' }];
        jokeService.getRandomJokes.mockResolvedValue(mockJoke);


        render(<Home />);

        // On attend que la blague soit affichée après le chargement
        await waitFor(() => {
            expect(screen.getByText('Blague aléatoire 1')).toBeInTheDocument();
        });
    });

    it('devrait afficher les blagues aléatoires après le chargement', async () => {
        const mockRandomJokes = [
            { id: 1, question: 'Blague aléatoire 1', response: 'Réponse de la blague 1' },
            // { id: 2, question: 'Blague aléatoire 2', response: 'Réponse de la blague 2' },
        ];
        jokeService.getRandomJokes.mockResolvedValue(mockRandomJokes);
        jokeService.getAllJokes.mockResolvedValue([]); 

        render(<Home />);

        // On attend que les blagues soient affichées après le chargement
        await waitFor(() => {
            expect(screen.getByText('Blague aléatoire 1')).toBeInTheDocument();
            // expect(screen.getByText('Blague aléatoire 2')).toBeInTheDocument();
        });
    });

    it('relève la réponse quand on clique sur le bouton', async () => {
        jokeService.getRandomJokes.mockResolvedValue([{ id: 1, question: 'Q', response: 'R' }]);

        render(<Home />);

        const details = await screen.findByText('Afficher la réponse', { selector: 'summary' });
        // Simuler le clic pour révéler la réponse
        fireEvent.click(details);

        expect(screen.getByText("R")).toBeInTheDocument();
    })

    it('devrait afficher une erreur si la récupération des blagues échoue', async () => {
        jokeService.getRandomJokes.mockRejectedValue(new Error('Erreur de réseau'));

        render(<Home />);

        await waitFor(() => {
            expect(screen.queryByText(/Chargement des blagues.../i)).not.toBeInTheDocument();
            // On peut aussi vérifier que l'erreur est loggée dans la console
        });
    });
});