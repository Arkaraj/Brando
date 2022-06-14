import React, { useState, useEffect, useContext } from "react";
import MovieService from "../Services/MovieService";
import { AuthContext } from "../Context/AuthContext";
import Wish from "./Wish";
import ShowWish from "./ShowWish";
import ShowService from "../Services/ShowService";

const WishList = () => {
  const { user } = useContext(AuthContext);

  const [towatch, setToWatch] = useState([]);
  const [toWatchShow, setToWatchShow] = useState([]);

  useEffect(() => {
    MovieService.getWishList(user._id).then((data) => {
      setToWatch(data);
      console.log(data);
    });

    ShowService.getUsersWishlistShows().then((data) => {
      setToWatchShow(data);
    });
  }, [user._id]);

  return (
    <div className="m-10">
      <h1 className="text-xl font-bold mb-2 capitalize">WishList:</h1>

      {(towatch.length || toWatchShow.length) > 0 ? (
        <>
          {towatch.length > 0 ? (
            <>
              <h3>Movies</h3>
              <hr />
              {towatch.map((wish, index) => (
                <Wish
                  key={index}
                  tmdbId={wish.id}
                  _id={wish._id}
                  setToWatch={setToWatch}
                />
              ))}
            </>
          ) : (
            <p>Sorry, you have got no Movie WatchList!!</p>
          )}
          {toWatchShow.length > 0 ? (
            <>
              <h3>Shows</h3>
              <hr />
              {toWatchShow.map((wish, index) => (
                <ShowWish
                  key={index}
                  tmdbId={wish}
                  setToWatch={setToWatchShow}
                />
              ))}
            </>
          ) : (
            <p>Sorry, you have got no Movie WatchList!!</p>
          )}
        </>
      ) : (
        <p>Sorry, you have got no WatchList!!</p>
      )}
    </div>
  );
};

export default WishList;
