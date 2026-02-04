'use client';
import { useEffect, useState } from "react";
import { jokeService } from "@/services/jokeServices.js";

export default function Home() {

  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chargement des blagues au montage du composant
    jokeService.getAllJokes()
      .then(data => {
        setJokes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching jokes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement des blagues...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Les blagues de Carambar
          </h1>
          <div className="flex flex-col gap-4">
            {jokes.map((joke) => (
              <div key={joke.id} className="rounded-lg border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <p className="text-zinc-900 dark:text-blue-100">{joke.question}</p>
                <p className="mt-2 font-medium text-zinc-700 dark:text-blue-300">{joke.response}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
