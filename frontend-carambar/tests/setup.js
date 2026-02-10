import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
// Ce fichier est exécuté avant chaque test pour configurer l'environnement de test
// Ici, on peut ajouter des configurations globales pour les tests, comme jest-dom
// qui ajoute des assertions personnalisées pour le DOM (ex: toBeInTheDocument)

// Bloque les imports CSS qui font planter Vitest
vi.mock('./src/app/globals.css', () => ({}));
vi.mock('\\.(css|less|scss|sass)$', () => ({}));

// Nettoie le DOM après chaque test pour éviter les interférences entre les tests
afterEach(() => {
  cleanup();
});

// Mock global pour fetch si nécessaire (par exemple, si on teste des services qui font des appels API)
if (!global.fetch) {
    global.fetch = vi.fn(); // Si vous utilisez Vitest (comme dans ce projet)
}
