import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './components/Nav'
import Search from './components/Search'
import Slider from './components/Slider'
import MovieSearch from './components/MovieSearch'
import Login from './components/Login'
import Register from './components/Register'
import Movies from './components/Movies'
import MoviePage from './components/MoviePage'
import Favourite from './components/Favourite'
import Profile from './components/Profile'
import Connect from './components/Connect'
import UserFav from './components/UserFav'
import Footer from './components/Footer'
import PrivateRoute from './Hocs/PrivateRoutes'
import PublicRoute from './Hocs/PublicRoute'
import Genres from './components/Genres'
import SGenres from './components/SGenres'
import Popular from './components/Popular'
import WishList from './components/WishList'

function App() {
  const [movies, setMovies] = useState([])

  // https://api.themoviedb.org/3/discover/movie?api_key=dca6ba47ee045002b2c647232f48e550

  // useEffect's effect can't be async function, we have to use .then to resolve the promise
  useEffect(() => {
    fetch(process.env.REACT_APP_MOVIE_API)
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
        <Route exact path='/' render={(props) => (
          <>
            <Search setMovies={setMovies} history={props.history} />
            <Slider />
            <div className="grid">
              {movies.length > 0 ? movies.map(movie => (
                <Movies key={movie.id} movie={movie} />
              )) : (
                  <p className="loading"></p>
                )}
            </div>
          </>
        )} />

        <Route path="/search/:movieName" component={MovieSearch} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/movies/:id" component={MoviePage} />
        <PrivateRoute path="/favourite" component={Favourite} />
        <PrivateRoute path="/wishlist" component={WishList} />
        <Switch>
          <PrivateRoute key="1" path="/connect/:id" component={UserFav} />
          <PrivateRoute key="2" path="/connect" component={Connect} />
        </Switch>

        <Switch>
          <Route path="/genres/:name" component={SGenres} />
          <Route path="/genres" component={Genres} />
        </Switch>
        <Route path="/popular/:page" render={(props) => (
          <Popular case="popular" {...props} />
        )} />
        <Route path="/rated/:page" render={(props) => (
          <Popular case="top_rated" {...props} />
        )} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
