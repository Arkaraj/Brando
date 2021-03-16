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
import page404 from './components/page404'
import Person from './components/Person'
import pic5 from './Images/image5.png'

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
        <Switch>

          <Route exact path='/' render={(props) => (
            <>
              <Search setMovies={setMovies} history={props.history} />
              <Slider />
              <div className="showcase">
                <div className="gridx">
                  {
                    movies.length > 0 ? movies.map(movie => (
                      <Movies key={movie.id} movie={movie} />
                    )) : (
                      <p className="loading mx-auto"></p>
                    )}
                </div>
              </div>
            </>
          )} />

          <Route path="/search/:movieName" exact component={MovieSearch} />
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/register" exact component={Register} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Route path="/movies/:id" setMovies={setMovies} exact component={MoviePage} />
          <PrivateRoute path="/favourite" exact component={Favourite} />
          <PrivateRoute path="/wishlist" exact component={WishList} />
          <Route path="/popular/:page" exact render={(props) => (
            <Popular case="popular" {...props} />
          )} />
          <Route path="/rated/:page" exact render={(props) => (
            <Popular case="top_rated" {...props} />
          )} />
          <Route path="/person/:id" component={Person} />
          <Route path="/genres/:name" exact component={SGenres} />
          <Route path="/genres" exact component={Genres} />
          <PrivateRoute key="1" exact path="/connect/:id" component={UserFav} />
          <PrivateRoute key="2" exact path="/connect" component={Connect} />

          <Route component={page404} />

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
