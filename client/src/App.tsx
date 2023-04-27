import "./App.css";
import MoviesResult from "./components/MoviesResult";
import SearchSection from "./components/SearchSection";
import LoadingContextProvider from "./contexts/LoadingContext";
import MovieContextProvider from "./contexts/MoviesContext";

function App() {
  return (
    <>
      <MovieContextProvider>
        <LoadingContextProvider>
          <div className="flex items-center justify-center gap-3 flex-col duration-500 ">
            <SearchSection />
            <MoviesResult />
          </div>
        </LoadingContextProvider>
      </MovieContextProvider>
    </>
  );
}

export default App;
