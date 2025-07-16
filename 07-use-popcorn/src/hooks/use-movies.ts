import { useEffect, useState } from "react";
import type { Movie } from "../types";

interface useMoviesProps {
    query: string;
    callback: () => void
}

const apiKey = import.meta.env.VITE_REACT_APP_MOVIES_API_KEY;

export function useMovies({ query, callback }: useMoviesProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    useEffect(() => {

        callback?.();

        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError('');
                const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
                    { signal: controller.signal });

                if (!res.ok) throw new Error('Something went wrong with fetching movies');

                const data = await res.json();
                if (data.Response === "False") throw new Error('Movies not found');

                setMovies(data.Search);
                setError('');
            } catch (error) {
                if ((error as Error).name !== "AbortError")
                    setError((error as Error).message)
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        }
    }, [query, callback]);
    return { movies, isLoading, error }
}