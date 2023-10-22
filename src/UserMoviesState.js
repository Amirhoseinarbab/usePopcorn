const avg = (params) => params.reduce(
    (previousValue, currentValue, i, params) =>
      previousValue + currentValue / params?.length,
    0
  );

export function UserMoviesState({
  moviesUserWatchedWithItsRate,
  setMoviesUserWatchedWithItsRate,
}) {
  console.log(moviesUserWatchedWithItsRate);

  const avgImdbRating = avg(
    moviesUserWatchedWithItsRate?.map((value) => value.imdbRating)
  );
  const avgUserRating = avg(
    moviesUserWatchedWithItsRate?.map((value) => value.appUserRating)
  );
  const accTime = moviesUserWatchedWithItsRate?.map((value) => value.runtime).reduce((acc,value) => acc + value , 0)
  
    document.title = "usePopcorn "

  function handelRemoveMovie(movieId) {
    setMoviesUserWatchedWithItsRate((watched) =>
      watched.filter((value) => movieId !== value.imdbId)
      
      );
      // console.log(movieId)
  }

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{moviesUserWatchedWithItsRate?.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(1)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(1)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{accTime} min</span>
          </p>
        </div>
      </div>

      <ul className="list" >
      {moviesUserWatchedWithItsRate?.map((movie) => (
          <li key={movie.imdbId}>
            <img
              src={movie.poster}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.appUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
              <button
                className="btn-delete"
                onClick={()=>handelRemoveMovie(movie.imdbId)}
              >
                X
              </button>
            </div>
          </li>
      ))}
        </ul>
    </>
  );
}
