'use client';
import { useEffect, useState } from "react";
import { jokeService } from "@/services/jokeServices.js";

export default function Home() {

  const [jokes, setJokes] = useState([]);
  const [randomJokes, setRandomJokes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Chargement des blagues aléatoires au montage du composant
    jokeService.getRandomJokes(5)
      .then(data => {
        setRandomJokes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching random jokes:", error);
        setLoading(false);
      });
    // Chargement de toutes les blagues pour le slider
    // jokeService.getAllJokes()
    //   .then(data => {
    //     setJokes(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching jokes:", error);
    //     setLoading(false);
    //   });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jokes.length) % jokes.length);
  };

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
      <header className="w-full bg-[#E10079] py-6 ">
        <h1 className="text-center text-3xl font-black uppercase tracking-widest text-white sm:text-4xl">
          Carambar & Co
        </h1>
      </header>
      <main className="container mx-auto flex flex-col min-h-screen w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Les blagues cultes
          </h2>

          <button
            onClick={fetchRandom}
            className="mb- transform rounded-full bg-[#E10079] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            Un blague au hasard ?
          </button>

          {/* Affichage des blagues aléatoires */}
          {randomJokes && (
            <div className="mt-4 w-full max-w-xl">
              <h3 className="text-lg font-bold text-[#E10079] dark:text-red-400">Blague aléatoire :</h3>
              <p className="mt-2 text-zinc-800 dark:text-zinc-200">{randomJokes[0]?.question}</p>
              <details className="cursor-pointer mt-2">
                <summary className="list-none bg-yellow-400 text-sm font-bold py-2 px-4 rounded-full inline-block hover:bg-yellow-300 dark:text-red-400">
                  <span className="sr-only">Afficher la réponse</span>
                  Afficher la réponse
                </summary>
                <p className="mt-4 text-lg text-zinc-800 font-medium italic dark:text-zinc-200">
                  {randomJokes[0]?.response}
                </p>
              </details>
            </div>
          )}

        {/* Wrapper du slider avec TAILLE FIXE */}
        <div className="relative w-full max-w-xl flex flex-col overflow-hidden rounded-3xl border-4 border-[#E10079] shadow-[10px_10px_0px_0px_#E10079]">
          
          {/* Conteneur des slides */}
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            aria-live="polite"
          >
            {jokes.map((joke) => (
              <div key={joke.id} className="w-full flex-shrink-0 p-4">
                <article 
                  className="flex min-h-[300px] flex-col rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-[#E10079] dark:text-red-400">
                    <span className="sr-only">Question : </span>
                    {joke.question}
                  </h3>

                  {/* Séparateur visuel style Carambar */}
                  <div className="my-2 h-1 w-full bg-yellow-400 transition-all group-hover:w-full"></div>
                  
                  {/* Bouton pour révéler la réponse (Accessibilité) */}
                  <details className="cursor-pointer">
                    <summary className="list-none bg-yellow-400 text-sm font-bold py-2 px-4 rounded-full inline-block hover:bg-yellow-300 dark:text-red-400">
                      <span className="sr-only">Afficher la réponse</span>
                      Afficher la réponse
                    </summary>
                    <p className="mt-4 text-lg text-zinc-800 font-medium italic dark:text-zinc-200">
                      <span className="sr-only">Réponse : </span>{joke.response}
                    </p>
                  </details>
                 
                </article>
              </div>
            ))}
          </div>
        </div>

          {/* Bouttons de navigation (Accessibles) */}
          <button
            onClick={prevSlide}
            aria-label="Blague précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#E10079] p-3 text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            aria-label="Blague suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#E10079] p-3 text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            &gt;
          </button>
        </div>
      </main>

      {/* Indicateurs (Dots) */}
      <div className="flex justify-center gap-2 pb-10">
        {jokes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Aller à la blague ${index + 1}`}
            className={`h-4 w-4 rounded-full border-2 border-[#E10079] transition-colors ${currentIndex === index ? 'bg-red-600' : 'bg-white'}`}
          />
      ))}
      </div>

      <footer className="w-full bg-[#E10079] py-4 text-center text-sm text-white">
        <p className="text-white dark:text-zinc-200">
          © {new Date().getFullYear()} Carambar & Co - Tous droits réservés - Humour pur sucre
        </p>
      </footer>
    </div>
  );
}
