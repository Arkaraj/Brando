import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Search from './components/Search'
import Movies from './components/Movies'
import MoviePage from './components/MoviePage'

function App() {
  const [movies, setMovies] = useState([])
  const MOVIE_API = process.env.REACT_APP_MOVIE_API

  // https://api.themoviedb.org/3/discover/movie?api_key=dca6ba47ee045002b2c647232f48e550

  // useEffect's effect can't be async function, we have to use .then to resolve the promise
  useEffect(() => {
    fetch(MOVIE_API)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path='/' exact render={(props) => (
          <>
            <Search setMovies={setMovies} />
            <div className="grid">
              {movies.length > 0 ? movies.map(movie => (
                <Movies key={movie.id} movie={movie} />
              )) : (
                  <p>No Movies</p>
                )}
            </div>
          </>
        )} />

        <Route exact path="/:id" component={MoviePage} />
      </div>
    </Router>
  );
}

export default App;
