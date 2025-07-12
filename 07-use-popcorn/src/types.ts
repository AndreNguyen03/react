export type Movie = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

export type WatchedMovie = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
    runtime: number,
    imdbRating: number,
    userRating: number,
}