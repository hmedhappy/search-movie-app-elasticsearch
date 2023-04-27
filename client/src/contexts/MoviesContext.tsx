import React, { ReactNode, createContext, useState } from "react";

export interface Movie {
  Title: string;
  Overview: string;
  Popularity: number;
  Genre: string;
  Poster_Url: string;
  Release_Date: string;
}

interface MovieContextState {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const MovieContext = createContext<MovieContextState>({
  movies: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMovies: () => {},
});

const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
