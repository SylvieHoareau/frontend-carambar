import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()], // Permet de comprendre le JSX
  test: {
    environment: 'jsdom', // Simule un navigateur (DOM) pour React
    globals: true,        // Permet d'utiliser 'describe', 'it', 'expect' sans les importer partout
    setupFiles: './tests/setup.js', // Fichier pour configurer jest-dom (voir plus bas)
    css: false,
    server: {
      deps: {
        inline: [
          /@asamuzakjp\/css-color/, 
          /@csstools\/css-calc/, 
          /tailwindcss/]
      }
    },
  },
  resolve: {
    alias: {
      // Configure l'alias @ pour qu'il pointe vers le dossier src
      '@': path.resolve(__dirname, './src'),
      // On redirige les bibliothèques qui plantent vers un fichier vide.
      // Vitest ne les exécutera pas, donc plus d'erreur "require() of ES Module".
      '@asamuzakjp/css-color': path.resolve(__dirname, './tests/__mocks__/styleMock.js'),
      '@csstools/css-calc': path.resolve(__dirname, './tests/__mocks__/styleMock.js'),
    },
  },
});