import React, { useState, useEffect } from 'react'

import Nav from './components/Nav'
import Movies from './components/Movies'

function App() {
  const [movies, setMovies] = useState([])
  const MOVIE_API = process.env.REACT_APP_MOVIE_API


  // useEffect's effect can't be async function, we have to use .then to resolve the promise
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=dca6ba47ee045002b2c647232f48e550')
      .then(res => res.json())
      .then(data => {
        setMovies([...data.results])
      })
  }, [])

  return (
    <div className="App">
      <Nav setMovies={setMovies} />
      {movies.length > 0 ? movies.map(movie => (
        <Movies key={movie.id} movie={movie} />
      )) : (
          <p>No Movies</p>
        )}
    </div>
  );
}

export default App;
