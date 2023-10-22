import { useEffect, useState } from "react";

const key = "715a6968";

export default function SearchResults({
  moviesResult,
  movieIdSelected,
  setMovieIdSelected,
  search,
  setMoviesResult,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log(error)

  useEffect(
    function () {
      setMovieIdSelected("");

      const controller = new AbortController();

      async function fetchSearch() {
        try {
          setError("");
          setLoading(true);
          const res = await fetch(
            `https://omdbapi.com/?apikey=${key}&s=${search}`,
            { signal: controller.signal }
          );

          // console.log(loading);

          if (!res.ok) throw new Error("Server responser Error!");

          const data = await res.json();

          if (data.Response === "False") {
            // console.log(data.Error);
            throw new Error(data.Error);
          }
          setMoviesResult(data.Search);

          // console.log(loading)
        } catch (e) {
          if (e.name !== "AbortError") {
            setError(e.message);
          }

          // console.log(e.name);
        } finally {
          setLoading(false);
        }
      }
      if (search.length >= 3) {
        fetchSearch();
      } else {
        search.length === 0 && setMoviesResult([]);
      }

      return function functionName() {
        controller.abort();
      };
    },

    [search]
  );

  return (
    <ul className="list list-movies">
      {moviesResult == 0 && <p className="loader">💖 Search something...</p>}

      {error && <p className="loader">{error}</p>}

      {loading && <p className="loader">Loading ...</p>}

      {!error &&
        moviesResult?.map((movie) => (
          <li
            key={movie.imdbID}
            onClick={() =>
              movieIdSelected !== movie.imdbID
                ? setMovieIdSelected(movie.imdbID)
                : setMovieIdSelected("")
            }
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}
