export type Movie = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

export type WatchedMovie = {
    imdbID: string,
    title: string,
    year: string,
    poster: string
    runtime: number,
    imdbRating: number,
    userRating?: number,
}

export type DetailMovie = {
    title: string;
    year : string;
    poster: string;
    runtime: string;
    imdbRating: string;
    plot: string;
    released: string;
    actors: string[];
    director: string;
    genre: string;
}

