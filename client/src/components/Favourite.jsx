import React, { useState, useEffect, useContext } from 'react';
import Favmovie from './Favmovie';
import { AuthContext } from '../Context/AuthContext';
import NoMovie from '../Images/noMovies.svg';
import ShowService from '../Services/ShowService';
import Favshow from './Favshow';
import MovieService from '../Services/MovieService';

const Favourite = () => {
  const [cine, setCine] = useState([]);
  const [show, setShow] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchShow = async () => {
      if (user) {
        return await ShowService.getUsersFavShows();
      } else return [];
    };

    const getCine = async () => {
      const cineFromServer = await MovieService.getUsersFavMovies(user._id);
      setCine(cineFromServer);
    };

    const getShow = async () => {
      const showFromServer = await fetchShow();
      setShow(showFromServer);
    };

    getCine();
    getShow();
  }, [user, user._id]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        Your Favourite Movies are:{' '}
      </h1>

      {cine.length > 0 ? (
        <div className="favgrid">
          {cine.map((mov) => (
            <Favmovie key={mov.id} movie={mov} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold">
          <img className="mx-auto" src={NoMovie} alt="No Favourites" />
          Looks Like you have not Marked any Movies as Favourite yet!
        </p>
      )}

      <h1 className="text-center text-2xl font-bold">
        Your Favourite Shows are:{' '}
        {show.length > 0 ? (
          <div className="favgrid">
            {show.map((tv) => (
              <Favshow key={Math.random()} tv={tv} />
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl font-bold">
            <img className="mx-auto" src={NoMovie} alt="No Favourites" />
            Looks Like you have not Marked any Shows as Favourite yet!
          </p>
        )}
      </h1>
    </div>
  );
};

export default Favourite;
