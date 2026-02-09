'use client';
import { useEffect, useState } from "react";
import { jokeService } from "@/services/jokeServices.js";

export default function Home() {

  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

   const fetchRandom = async () => {
    try {
        setError(false);
        const data = await jokeService.getRandomJokes(1);
        setJoke(Array.isArray(data) ? data[0] : data);
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        setError(true);
    } finally {
        setLoading(false);
    }
  };

  // Chargement initial des blagues aléatoires
  useEffect(() => {
    fetchRandom(); // Charge une blague aléatoire au montage du composant
  }, []);

  // Ecran de chargement
  if (loading) {
    return (
      <div aria-live="polite" role="status" className="flex min-h-screen items-center justify-center bg-[#FFFF00] font-sans dark:bg-black">
        <span className="text-xl font-bold text-[#E10079] animate-pulse">Chargement des blagues...</span>
      </div>
    );
  }

  return (
    // Palette Carambar : #E10079 (rouge), #FFFF00 (jaune)
    <div className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      {/* Header fixe */}
      <header className="w-full bg-[#E10079] py-6 ">
        <h1 className="text-center text-3xl font-black uppercase tracking-widest text-white sm:text-4xl">
          Carambar & Co
        </h1>
      </header>
      <main className="container mx-auto flex flex-col min-h-screen w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            La blague du moment <span className="text-[#E10079]">😉</span>
          </h2>

          <button
            onClick={fetchRandom}
            className="group relative flex items-center gap-2 overflow-hidden transform rounded-full bg-[#E10079] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 active:scale-95 shadow-xl"
          >
            Une autre blague ?
          </button>

          {/* Affichage des blagues aléatoires */}
          {joke ? (
            <div className="mt-4 w-full max-w-xl p-4 border-2 border-[#E10079] rounded-xl bg-yellow-50">
              <h3 className="text-lg font-bold text-[#E10079] dark:text-red-400">Blague aléatoire :</h3>
              
              <p className="mt-2 text-zinc-800 dark:text-zinc-200">
                {joke.question || joke.content || "Oups, pas de question !"}
              </p>

              <div className="my-6 h-1 w-full bg-yellow-400"></div>
              
              <details className="group cursor-pointer mt-2">
                <summary className="list-none bg-yellow-400 text-sm font-bold py-2 px-4 rounded-full inline-block hover:bg-yellow-300 dark:text-red-400">
                  <span className="sr-only">Afficher la réponse</span>
                  Afficher la réponse
                </summary>
                <p className="mt-4 text-lg text-zinc-800 font-medium italic animate-in fade-in slide-in-from-top-4 dark:text-zinc-200">
                  {joke.response || "C'est un mystère !"}
                </p>
              </details>
            </div>
          ) : error &&(
            <p className="text-red-600 dark:text-red-400">Erreur lors du chargement de la blague.</p>
          )}
        </div>
      </main>

      <footer className="w-full bg-[#E10079] py-4 text-center text-sm text-white">
        <p className="text-white dark:text-zinc-200">
          © {new Date().getFullYear()} Carambar & Co - Tous droits réservés - Humour pur sucre
        </p>
      </footer>
    </div>
  );
}
