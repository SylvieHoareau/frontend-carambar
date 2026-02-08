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
    server: {
      deps: {
        inline: [true]
      }
    }
  },
  resolve: {
    alias: {
      // Configure l'alias @ pour qu'il pointe vers le dossier src
      '@': path.resolve(__dirname, './src'),
    },
  },
});