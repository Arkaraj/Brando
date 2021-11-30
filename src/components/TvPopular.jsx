import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Search from "./Search";
import Pagination from "./Pagination";
import Shows from "./Shows";
import ShowService from "../Services/ShowService";

const TvPopular = (props) => {
  const [shows, setShows] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  let pageNumber = props.match.params.page || 1;

  pageNumber = isNaN(pageNumber) ? 0 : pageNumber;

  // pageNumber = pageNumber === 0 ? 0 : (pageNumber * pageNumber) / pageNumber;
  pageNumber = pageNumber === 0 ? 0 : Number(pageNumber);

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
    if (pageNumber < 1) {
      props.history.push("/");
    }

    /**
     * This function will check if the user has any shows in favourites or wishlist or not
     * @param {Number[]} arrayOfIds This will contain the ids of all the shows
     * @param {any[]} showData This contains all the show data
     * @returns {Promise<any[]>} This will return the show data along with two new parameters, favorite and wishlist both being boolean
     */
    const newShowObject = async (arrayOfIds, showData) => {
      const data = await ShowService.getShows();
      if (data.msgError) {
        alert(data.message);
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
      `https://api.themoviedb.org/3/tv/${props.case}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (isAuthenticated) {
          let fullData = data.results;

          let arrayId = fullData.map((d) => d.id);

          let newData = await newShowObject(arrayId, fullData);

          setShows(newData);
        } else {
          setShows(data.results);
        }
      });
  }, [isAuthenticated, pageNumber, props.case, props.history]);

  return (
    <>
      <Search history={props.history} />
      <div className="gridx">
        {shows ? (
          shows.length > 0 ? (
            shows.map((show) => <Shows key={show.id} show={show} />)
          ) : (
            <p></p>
          )
        ) : (
          <p>You have Ventured out to far!!</p>
        )}
      </div>
      <Pagination pcase={props.case} page={pageNumber} ptype={"tv"} />
    </>
  );
};

export default TvPopular;
