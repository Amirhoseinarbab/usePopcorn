import { useEffect, useState } from "react";
import { UserMoviesState } from "./UserMoviesState";
import { MovieDetail } from "./MovieDetail";
import { useStoreState } from "./customHooks/useStoreState";
import SearchResults from "./SearchResults";

export const key = "715a6968";
// https://omdbapi.com/?apikey=715a6968&t=see

export default function App() {
  const [search, setSearch] = useState("");
  const [moviesResult, setMoviesResult] = useState([]);
  const [movieIdSelected, setMovieIdSelected] = useState("");

  const [moviesUserWatchedWithItsRate, setMoviesUserWatchedWithItsRate] =
    useStoreState("watched");

  //   const localSReplay = JSON.parse( localStorage.getItem("moviesUserWatchedWithItsRate"))
  // console.log(localSReplay)

  // console.log(movieIdSelected);

  return (
    <>
      <NavBar
        search={search}
        setSearch={setSearch}
        moviesResult={moviesResult}
      />
      <Main>
        <DetailsBar>
          <SearchResults
            moviesResult={moviesResult}
            movieIdSelected={movieIdSelected}
            setMovieIdSelected={setMovieIdSelected}
            search={search}
            setMoviesResult={setMoviesResult}
          />
        </DetailsBar>
        <DetailsBar>
          {movieIdSelected && (
            <MovieDetail
              key={movieIdSelected}
              moviesUserWatchedWithItsRate={moviesUserWatchedWithItsRate}
              setMoviesUserWatchedWithItsRate={setMoviesUserWatchedWithItsRate}
              movieIdSelected={movieIdSelected}
              setMovieIdSelected={setMovieIdSelected}
            />
          )}
          {!movieIdSelected && (
            <UserMoviesState
              moviesUserWatchedWithItsRate={moviesUserWatchedWithItsRate}
              setMoviesUserWatchedWithItsRate={setMoviesUserWatchedWithItsRate}
            />
          )}
        </DetailsBar>
      </Main>
    </>
  );
}

function NavBar({ search, setSearch, moviesResult }) {
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {moviesResult != 0 && (
          <p className="num-results">
            Found <strong>{moviesResult?.length}</strong> results
          </p>
        )}
      </nav>
    </>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

function DetailsBar({ children }) {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setToggle((t) => !t)}>
        {toggle ? "–" : "+"}
      </button>
      {toggle && children}
    </div>
  );
}
