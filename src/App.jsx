import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Slider from "./components/Slider";
import MovieSearch from "./components/MovieSearch";
import Login from "./components/Login";
import Register from "./components/Register";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import Favourite from "./components/Favourite";
import Profile from "./components/Profile";
import Connect from "./components/Connect";
import UserFav from "./components/UserFav";
import Footer from "./components/Footer";
import PrivateRoute from "./Hocs/PrivateRoutes";
import PublicRoute from "./Hocs/PublicRoute";
import Genres from "./components/Genres";
import SGenres from "./components/SGenres";
import Popular from "./components/Popular";
import WishList from "./components/WishList";
import page404 from "./components/page404";
import Person from "./components/Person";
import Artist from "./components/Artist";
import About from "./components/About";
import Contact from "./components/Contact";
import TvPopular from "./components/TvPopular";
import ShowPage from "./components/ShowPage";

function App() {
  const [movies, setMovies] = useState([]);

  // https://api.themoviedb.org/3/discover/movie?api_key=dca6ba47ee045002b2c647232f48e550

  // useEffect's effect can't be async function, we have to use .then to resolve the promise
  useEffect(() => {
    // redis cache this
    fetch(process.env.REACT_APP_MOVIE_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });

    // setServer(movies.map(mov => [{ id: mov.id }]))
  }, []);

  return (
    <Router>
      <div className="App">
        <Route
          render={(props) => (
            <Nav history={props.history} setMovies={setMovies} />
          )}
        />
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <Slider />
                  {/* <Search setMovies={setMovies} history={props.history} /> */}
                  <div className="showcase">
                    <div className="gridx">
                      {movies.length > 0 ? (
                        movies.map((movie) => (
                          <Movies key={movie.id} movie={movie} />
                        ))
                      ) : (
                        <p className="loading mx-auto"></p>
                      )}
                    </div>
                  </div>
                </>
              )}
            />

            <Route path="/search/:movieName" exact component={MovieSearch} />
            <Route path="/actor/search/:actorName" exact component={Artist} />
            <PublicRoute path="/login" exact component={Login} />
            <PublicRoute path="/register" exact component={Register} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route
              path="/movies/:id"
              setMovies={setMovies}
              exact
              component={MoviePage}
            />
            <Route
              path="/tv/:id"
              setMovies={setMovies}
              exact
              component={ShowPage}
            />
            <PrivateRoute path="/favourite" exact component={Favourite} />
            <PrivateRoute path="/wishlist" exact component={WishList} />
            <Route
              path="/popular/:page"
              exact
              render={(props) => <Popular case="popular" {...props} />}
            />
            <Route
              path="/rated/:page"
              exact
              render={(props) => <Popular case="top_rated" {...props} />}
            />
            <Route path="/person/:id" component={Person} />
            <Route path="/actor" exact component={Artist} />
            <Route path="/genres/:name" exact component={SGenres} />
            <Route path="/genres" exact component={Genres} />
            <Route
              path="/tv/popular/:page"
              exact
              render={(props) => <TvPopular case="popular" {...props} />}
            />
            <Route
              path="/tv/rated/:page"
              exact
              render={(props) => <TvPopular case="top_rated" {...props} />}
            />
            <PrivateRoute
              key="1"
              exact
              path="/connect/:id"
              component={UserFav}
            />

            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />

            <PrivateRoute key="2" exact path="/connect" component={Connect} />

            <Route component={page404} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
