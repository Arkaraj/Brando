import React, { useState, useEffect, useContext } from "react";
import Search from "./Search";
import Movies from "./Movies";
import Shows from "./Shows";
import { AuthContext } from "../Context/AuthContext";
import ShowService from "../Services/ShowService";

const MovieSearch = (props) => {
  const [flim, setFlim] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  // get flim
  const name = props.match.params.movieName;

  const [mode, setMode] = useState("movie");

  const { isAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    setMode(e.target.value);
  };

  /**
   * Checks if the id is present in the Shows favourite or not.
   * @param {Number[]} array This is the array of numbers
   * @param {Number} tvId The id to check
   * @returns {Boolean} Returns if the number is is found or not
   */
  const isPresentInShows = (array, tvId) => {
    return array.includes(tvId);
  };

  useEffect(() => {
    /**
     * This function will check if the user has any shows in favourites or wishlist or not
     * @param {Number[]} arrayOfIds This will contain the ids of all the shows
     * @param {any[]} showData This contains all the show data
     * @returns {Promise<any[]>} This will return the show data along with two new parameters, favorite and wishlist both being boolean
     */
    const newShowObject = async (arrayOfIds, showData) => {
      const data = await ShowService.getShows();
      if (data.msgError) {
        alert(data.err);
        return;
      } else {
        let { favourites, wishlist } = data;

        // O(n^2)
        arrayOfIds.forEach((tvId, idx) => {
          if (isPresentInShows(favourites, tvId)) {
            showData[idx].favourites = true;
            showData[idx].wishlist = false;
          } else if (isPresentInShows(wishlist, tvId)) {
            showData[idx].favourites = false;
            showData[idx].wishlist = true;
          } else {
            showData[idx].favourites = false;
            showData[idx].wishlist = false;
          }
        });

        return showData;
      }
    };

    fetch(
      `https://api.themoviedb.org/3/search/${mode}?api_key=${process.env.REACT_APP_API_KEY}&query=${name}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        setIsLoaded(true);
        if (isAuthenticated) {
          if (mode === "tv") {
            let fullData = data.results;

            let arrayId = fullData.map((d) => d.id);

            let newData = await newShowObject(arrayId, fullData);

            setFlim(newData);
          } else {
            setFlim(data.results);
          }
        } else {
          setFlim(data.results);
        }
      });
  }, [name, mode, isAuthenticated]);

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
