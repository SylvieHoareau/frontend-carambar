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
      <header className="w-full bg-[#E10079] py-6 shadow-md">
        <h1 className="text-center text-2xl font-black uppercase tracking-widest text-white sm:text-4xl">
          Carambar & Co
        </h1>
      </header>

      <main className="container mx-auto flex flex-1 flex-col min-h-screen w-full max-w-3xl items-center justify-between py-12 px-16 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-32">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-2xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            La blague du moment <span className="text-[#E10079]">😉</span>
          </h2>

          <button
            onClick={fetchRandom}
            className="group relative flex items-center gap-2 overflow-hidden transform rounded-full bg-[#E10079] px-6 py-3 text-sm font-bold text-white transition-all focus:outline-none focus:ring-4 hover:scale-105 active:scale-95 shadow-lg"
          >
            Une autre blague ?
          </button>

          {/* Affichage des blagues aléatoires */}
          {joke ? (
            <div className="mt-4 w-full max-w-xl p-6 border-2 border-[#E10079] rounded-xl bg-yellow-50 dark:bg-zinc-900 shadow-sm">
              <h3 className="text-lg font-bold text-[#E10079] dark:text-red-400">Blague aléatoire :</h3>
              
              <p className="tex-lg font-bold text-zinc-800 dark:text-zinc-100 sm:text-xl">
                {joke.question || joke.content || "Oups, pas de question !"}
              </p>

              <div className="my-6 h-1 w-full bg-yellow-400"></div>
              
              <details className="group cursor-pointer">
                <summary className="list-none bg-yellow-400 text-xs font-black py-2 px-6 rounded-full inline-block hover:bg-yellow-300 transition-colors uppercase">
                  <span className="sr-only">Afficher la réponse</span>
                  Afficher la réponse
                </summary>
                <p className="mt-6 text-xl font-medium italic text-[#E10079] animate-in fade-in slide-in-from-top-4 dark:text-zinc-200">
                  {joke.response || "C'est un mystère !"}
                </p>
              </details>
            </div>
          ) : error &&(
            <p className="text-red-600 font-bold dark:text-red-400">Erreur lors du chargement de la blague.</p>
          )}
        </div>
      </main>

      <footer className="w-full bg-[#E10079] py-4 text-center text-xs text-white">
        <p className="text-white dark:text-zinc-200">
          © {new Date().getFullYear()} Carambar & Co - Tous droits réservés - Humour pur sucre
        </p>
      </footer>
    </div>
  );
}
