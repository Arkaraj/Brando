import React, { useState, useEffect } from "react";
import Search from "./Search";
import Movies from "./Movies";
import Shows from "./Shows";

const MovieSearch = (props) => {
  const [flim, setFlim] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  // get flim
  const name = props.match.params.movieName;

  const [mode, setMode] = useState("movie");

  const handleChange = (e) => {
    setMode(e.target.value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/${mode}?api_key=${process.env.REACT_APP_API_KEY}&query=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlim(data.results);
        setIsLoaded(true);
      });
  }, [name, mode]);

  return (
    <>
      <Search history={props.history} />
      <select onChange={(e) => handleChange(e)}>
        <option value="movie">Movies</option>
        <option value="tv">Shows/Series</option>
      </select>
      <div className="gridx">
        {isLoaded ? (
          flim.length > 0 ? (
            mode === "movie" ? (
              flim.map((flim) => <Movies key={flim.id} movie={flim} />)
            ) : (
              flim.map((flim) => <Shows key={flim.id} show={flim} />)
            )
          ) : (
            <p>No Moives</p>
          )
        ) : (
          <p className="loading"></p>
        )}
      </div>
      {/* Pagination needed */}
    </>
  );
};

export default MovieSearch;
