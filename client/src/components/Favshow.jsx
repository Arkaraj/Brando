import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const noImage =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
const Show_Img = "http://image.tmdb.org/t/p/w220_and_h330_face/";

const Favshow = ({ tv }) => {
  const [show, setShow] = useState([]);

  useEffect(() => {
    const fetchShow = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tv}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      return data;
    };
    const getShow = async () => {
      const movieFromServer = await fetchShow();
      setShow(movieFromServer);
    };

    getShow();
  }, [tv]);

  const poster = Show_Img + show.poster_path;

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
    <div className="flex flex-col justify-items-center items-center text-base">
      <div className="card">
        <div
          id="movieCard"
          className="container max-h-1/6 mx-auto rounded-lg overflow-hidden shadow-2xl my-2 bg-white"
          style={{ maxWidth: "13.7rem" }}
        >
          {/* background: '#22254b' */}
          <div
            className="relative overflow-hidden z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vh))",
            }}
          >
            <Link to={`/tv/${show.id}/`}>
              <img
                className
                src={show.poster_path ? poster : noImage}
                alt="Movie Pic"
              />
            </Link>
          </div>
          <div className="relative flex justify-between items-center flex-row px-2 z-10 -mt-8">
            <p
              className={`flex items-center text-gray-400 tag ${setTagColour(
                show.vote_average
              )}`}
            >
              {/* className={`tag ${setTagColour(flim.vote_average)}`} */}
              <span className={`dot ${setTagColour(show.vote_average)}`} />
              {show.vote_average ? (show.vote_average.toFixed(2) * 10).toFixed(2) : 0}%
            </p>
          </div>
          <div className="pt-2 pb-2 text-gray-600 text-center">
            <p>{show.name}</p>
          </div>
          <div className="pb-1 capitalize text-center tracking-wide flex justify-evenly bg-blue-200">
            <div className="posts">
              <p className=" border-t-2 w-screen border-blue-400" />
              <Link
                to={`/tv/${show.id}`}
                className="text-lg underline cursor-pointer hover:text-blue-600 font-semibold text-blue-500"
              >
                view details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favshow;
