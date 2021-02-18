import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

import Nav from './components/Nav'
import Search from './components/Search'
import Login from './components/Login'
import Register from './components/Register'
import Movies from './components/Movies'
import MoviePage from './components/MoviePage'
import Favourite from './components/Favourite'
import Footer from './components/Footer'

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

    // setServer(movies.map(mov => [{ id: mov.id }]))
    // console.log(server)

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
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Switch>
          <Route exact path="/movies/:id" component={MoviePage} />
          <Route exact path="/favourite" component={Favourite} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
