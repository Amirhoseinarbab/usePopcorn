import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { key } from "./App";
import { useKey } from "./customHooks/useKey";

export function MovieDetail({
  movieIdSelected,
  setMovieIdSelected,
  moviesUserWatchedWithItsRate,
  setMoviesUserWatchedWithItsRate,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const [error, setError] = useState(null);

  // console.log(moviesUserWatchedWithItsRate)

  const isWatched = moviesUserWatchedWithItsRate?.map((movie) => movie.imdbId)
    .includes(movieIdSelected);
  const watchedUserRating = moviesUserWatchedWithItsRate?.find(
    (value) => value.imdbId === movieIdSelected
  )?.appUserRating;
  // console.log(isWatched)
  // console.log(watchedUserRating)

  function handelAddUserMovie() {
    const adjustedMovieDetails = {
      imdbId: movieDetails.imdbID,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: Number(movieDetails.imdbRating),
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      rating: movieDetails.Ratings[0].Value,
      appUserRating: userRating,
    };

    setMoviesUserWatchedWithItsRate((a) => [...a, adjustedMovieDetails]);

    // console.log(adjustedMovieDetails);
    // console.log(moviesUserWatchedWithItsRate);
  }

  useEffect(
    function () {

      

      async function fetchDetails() {
        setLoading(true);
        setError("");

        try {
          const res = await fetch(
            `https://omdbapi.com/?apikey=${key}&i=${movieIdSelected}`
          );
        
          const data = await res.json();

          // 1
          setMovieDetails(data);
          // 2
          document.title = data.Title

          setError("");
          // console.log(data.Title);
          // console.log(`https://omdbapi.com/?apikey=${key}&i=${movieIdSelected}`);
          // console.log(data);
        } catch (e) {
          setError(e.message);
          // console.log(e.message);
        } finally {
          setLoading(false);
        }
      }
      fetchDetails();

      return function cuf() {

        
      }
    },
    [movieIdSelected]
  );

  useKey("escape" , function () {
    // console.log("dd")
    setMovieIdSelected("");

    
  })

  return (
    <div className="details">

      {error && <p className="loader">{error}</p>}
      {!loading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={() => setMovieIdSelected("")}>
              ←
            </button>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} • {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Actors}</p>
              <p>
                <span>⭐️</span>
                {movieDetails.imdbRating}
              </p>
            </div>
          </header>

          <section>
            {isWatched ? (
              <p>
                You rated with movie {watchedUserRating} <span>⭐️</span>
              </p>
            ) : (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button
                    className="btn-add"
                    onClick={() => handelAddUserMovie()}
                  >
                    + Add to list
                  </button>
                )}
              </div>
            )}

            <p>{movieDetails.Director}</p>
            <p>{movieDetails.Plot}</p>
            <p>{movieDetails.Awards}</p>
          </section>
        </>
      )  }
      
      {loading &&  (<p className="loader">Loading ...</p>)}
     
    </div>
  );
}

