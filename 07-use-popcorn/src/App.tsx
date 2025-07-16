import { useEffect, useRef, useState } from "react";
import type { DetailMovie, Movie, WatchedMovie } from "./types";
import StarRating from "./StarRating";
import { useMovies } from "./hooks/use-movies";
import { useLocalStorageState } from "./hooks/use-local-storage";
import { useKey } from "./hooks/use-key";

// const tempMovieData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt0133093",
//         Title: "The Matrix",
//         Year: "1999",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt6751668",
//         Title: "Parasite",
//         Year: "2019",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//     },
// ];

// const tempWatchedData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     },
//     {
//         imdbID: "tt0088763",
//         Title: "Back to the Future",
//         Year: "1985",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];

const average = (arr: number[]) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const tempQuery = 'interstellar'
const apiKey = import.meta.env.VITE_REACT_APP_MOVIES_API_KEY;

export default function App() {
    const [query, setQuery] = useState<string>(tempQuery);
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

    const handleCloseMovie = () => {
        setSelectedMovieId(null);
    }

    const { movies, isLoading, error } = useMovies({ query, callback: handleCloseMovie })

    const [watched, setWatched] = useLocalStorageState([], "watched");

    const handleSelectMovie = (movieId: string) => {
        setSelectedMovieId((currMovieId) => (movieId === currMovieId ? null : movieId));
    }

    const handleAddWatchedMovie = (movie: WatchedMovie) => {
        setWatched((currWatched: WatchedMovie[]) => [...currWatched, movie])
    }

    const handleDeleteWatchedMovie = (watchId: string) => {
        setWatched((currWatched: WatchedMovie[]) => currWatched.filter(watched => watched.imdbID === watchId))
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {
                        selectedMovieId
                            ? (<MovieDetails selectedId={selectedMovieId} watched={watched} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatchedMovie} />)
                            : (
                                <>
                                    <WatchedSummary watched={watched} />
                                    <WatchedList watched={watched} onDeleteWatched={handleDeleteWatchedMovie} />
                                </>
                            )
                    }
                </Box>
            </Main>
        </>
    );
}


const Loader = () => {
    return (
        <p className="loader">
            Loading...
        </p>
    )
}

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className="error">
            {message}
        </p>
    )
}


interface NavBarProps {
    children: React.ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {

    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
}

interface NumResultsProps {
    movies: Movie[]
}

const NumResults: React.FC<NumResultsProps> = ({ movies }) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

const Logo = () => {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

interface SearchProps {
    query: string;
    setQuery: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {

    const inputEl = useRef<HTMLInputElement | null>(null);

    useKey('Enter', () => {
        if (document.activeElement === inputEl.current) return;
        if (inputEl.current) {
            inputEl.current.focus();
            setQuery('');
        }
    })


    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

interface BoxProps {
    children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen &&
                children
            }
        </div>
    )
}

interface MovieListProps {
    movies: Movie[];
    onSelectMovie: (movieId: string) => void
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
            ))}
        </ul>
    )
}

interface MovieItemProps {
    movie: Movie;
    onSelectMovie: (movieId: string) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onSelectMovie }) => {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

interface MovieDetailsProps {
    selectedId: string;
    watched: WatchedMovie[];
    onCloseMovie: () => void;
    onAddWatched: (movie: WatchedMovie) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ selectedId, watched, onCloseMovie, onAddWatched }) => {

    const [movie, setMovie] = useState<DetailMovie | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const countRef = useRef<number>(0);

    useEffect(() => {
        if (rating) countRef.current++;
    }, [rating])

    const isWatched = watched.map(watched => watched.imdbID).includes(selectedId);
    const watchedRating = watched.find(watched => watched.imdbID === selectedId)?.userRating;

    useKey('Escape', onCloseMovie);

    useEffect(() => {
        const changeTitle = () => {
            if (!movie || !movie.title) return;
            document.title = `Movie | ${movie.title}`
        }
        changeTitle()

        return function () {
            document.title = 'usePopcorn'
        }
    }, [movie])

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);

                const data = await res.json();

                const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = data

                const movieDetails: DetailMovie = { title, year, poster, runtime, imdbRating, plot, released, actors, director, genre }

                setMovie(movieDetails)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setIsLoading(false);
            }
        }

        getMovieDetails();
    }, [selectedId])

    const handleAdd = () => {

        if (!movie) return;

        const newWatchedMovie: WatchedMovie = {
            imdbID: selectedId,
            title: movie.title,
            year: movie.year,
            poster: movie.poster,
            runtime: Number(movie.runtime.split(" ").at(0)),
            imdbRating: Number(movie.imdbRating),
            userRating: rating
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie()
    }

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={movie?.poster} alt={movie?.poster} />
                        <div className="details-overview">
                            <h2>{movie?.title}</h2>
                            <p>{movie?.released} &bull; {movie?.runtime}</p>
                            <p>{movie?.genre}</p>
                            <p>
                                {movie?.imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {isWatched ? (
                                <p>You watched this movie with {watchedRating}</p>
                            ) : (
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={setRating} />
                                    {rating > 0 && (
                                        <button className="btn-add" onClick={handleAdd}>
                                            + Add to the list
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <p>
                            <em>{movie?.plot}</em>
                        </p>
                        <p>Starring {movie?.actors}</p>
                        <p>Directed by {movie?.director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    )
}

interface WatchedSummaryProps {
    watched: WatchedMovie[],
}

const WatchedSummary: React.FC<WatchedSummaryProps> = ({ watched }) => {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating).filter((n): n is number => n !== undefined));
    const avgUserRating = average(watched.map((movie) => movie.userRating).filter((n): n is number => n !== undefined));
    const avgRuntime = average(watched.map((movie) => movie.runtime).filter((n): n is number => n !== undefined));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    )
}



interface WatchedListProps {
    watched: WatchedMovie[];
    onDeleteWatched: (movieId: string) => void;
}

const WatchedList: React.FC<WatchedListProps> = ({ watched, onDeleteWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedItem movie={movie} key={movie.imdbID} onDelete={onDeleteWatched} />
            ))}
        </ul>
    )
}

interface WatchedItemProps {
    movie: WatchedMovie;
    onDelete: (movieId: string) => void;
}
const WatchedItem: React.FC<WatchedItemProps> = ({ movie, onDelete }) => {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
                    X
                </button>
            </div>
        </li>
    )
}

interface MainProps {
    children: React.ReactNode
}
const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <main className="main">
            {children}
        </main>
    )
}