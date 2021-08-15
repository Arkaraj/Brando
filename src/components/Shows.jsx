/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { Route, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { TiStarFullOutline } from "react-icons/ti";
import { BsFillBookmarkFill } from "react-icons/bs";

const Show_Img = "http://image.tmdb.org/t/p/w220_and_h330_face/";

const Shows = ({ show }) => {
  // if user is logged in only then
  const { isAuthenticated } = useContext(AuthContext);

  const [fav, setFav] = useState(show.favourites);

  const [wish, setWish] = useState(show.wishlist);

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
  const poster = Show_Img + show.poster_path;

  const favourite = async (id) => {
    // UI changes
    setFav((fav) => !fav);
    // setSame(same => !same)
    // Server Side Storing
  };

  const wishList = async (id) => {
    // UI changes
    setWish((wish) => !wish);

    // Server Side Storing
  };

  const setTagColour = (vote) => {
    if (vote >= 8) {
      return "s";
    } else if (vote >= 5) {
      return "a";
    } else if (vote > 0) {
      return "f";
    } else if (vote === 0) {
      return "n";
    }
  };
  return (
    <Route path="/">
      <div className="card flex-col justify-items-center">
        <div
          id="movieCard"
          className="max-h-1/6 mx-auto rounded-lg overflow-hidden bg-white"
          style={{ maxWidth: "13.7rem" }}
        >
          {/* background: '#22254b' */}
          <div
            className="relative overflow-hidden z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 3vh))",
            }}
          >
            <Link to={`/tv/${show.id}/`}>
              <img
                className
                src={show.poster_path ? poster : noImage}
                alt="Movie_Image"
              />
            </Link>
          </div>
          <div className="relative flex justify-between items-center flex-row px-2 z-10 -mt-8">
            <p
              className={`tag flex items-center text-gray-400 ${setTagColour(
                show.vote_average
              )}`}
            >
              {/* className={`tag ${setTagColour(movie.vote_average)}`} */}
              <span className={`dot ${setTagColour(show.vote_average)}`} />
              {parseFloat(show.vote_average).toFixed(1) * 10}%
            </p>

            {isAuthenticated ? (
              <>
                {fav ? null : (
                  <BsFillBookmarkFill
                    onClick={() => wishList(show.id)}
                    className={
                      wish
                        ? "text-yellow-500 text-3xl rounded-full cursor-pointer"
                        : "text-green-400 hover:bg-yellow-300 text-3xl hover:text-yellow-500 active:text-yellow-500 rounded-full cursor-pointer"
                    }
                  />
                )}
                {!wish ? (
                  <button
                    className="p-4 bg-blue-600 rounded-full hover:bg-blue-500 focus:bg-blue-700 transition ease-in duration-200 focus:outline-none"
                    onClick={() => favourite(show.id)}
                  >
                    <TiStarFullOutline className={fav ? "blue" : "star"} />
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="pt-2 pb-2 text-gray-600 text-center">
            <p>{show.title}</p>
            <p className="text-sm">{show.release_date}</p>
          </div>
          <div className="pb-1 capitalize text-center tracking-wide flex justify-evenly bg-blue-200">
            <div className="posts">
              <p className=" border-t-2 w-screen border-blue-400" />
              <Link
                to={`/tv/${show.id}/`}
                className="text-lg underline cursor-pointer hover:text-blue-600 font-semibold text-blue-500"
              >
                view details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Route>
  );
};

export default Shows;
