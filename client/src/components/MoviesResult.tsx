import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { MovieContext } from "../contexts/MoviesContext";

export default function MoviesResult() {
  const { movies } = useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  if (loading)
    return (
      <div>
        <svg
          className="animate-spin !w-[5.25rem] bg-[blue] !h-[0.25rem]  mt-3"
          viewBox="0 0 24 24"
        ></svg>
      </div>
    );

  return (
    <div
      style={{ height: movies?.length ? "auto" : "0px" }}
      className="grid grid-cols-1 overflow-y-scroll gap-6 place-items-center place-content-center 2xl:px-[200px] 2xl:grid-cols-4 xl:grid-cols-3  lg:grid-cols-3 md:grid-cols-2  "
    >
      {movies?.map((e) => (
        <div
          style={{ backgroundImage: `url("${e?.Poster_Url}")` }}
          className="w-[300px] h-[400px] bg-cover"
        ></div>
      ))}
    </div>
  );
}
