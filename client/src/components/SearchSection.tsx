import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { MovieContext } from "../contexts/MoviesContext";
import Logo from "/vite.svg";

export default function SearchSection() {
  const [phrase, setphrase] = useState("");
  const { setMovies } = useContext(MovieContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (phrase) {
      setLoading(false);
      fetch(`http://localhost:3333/search/movie-db?q=${phrase}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.hits?.length) {
            setMovies(data?.hits?.map((e: any) => e?._source));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrase]);
  return (
    <div className="flex items-center justify-center flex-col">
      <a href="https://vitejs.dev" target="_blank">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>
      <input
        onChange={(e) => setphrase(e.target.value)}
        type="text"
        className="search-click"
        name=""
        placeholder="search movie..."
      />
    </div>
  );
}
