export default function JokeCard({ joke }) {
    return (
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
    );
}