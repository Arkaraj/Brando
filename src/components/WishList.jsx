import React, { useState, useEffect, useContext } from "react";
import MovieService from "../Services/MovieService";
import { AuthContext } from "../Context/AuthContext";
import Wish from "./Wish";

const WishList = () => {
  const { user } = useContext(AuthContext);

  const [towatch, setToWatch] = useState([]);

  useEffect(() => {
    MovieService.getWishList(user._id).then((data) => {
      setToWatch(data);
      // console.log(data)
    });
  }, [user._id]);

  return (
    <div className="m-10">
      <h1 className="text-xl font-bold mb-2 capitalize">WishList:</h1>

      {towatch.length > 0 ? (
        towatch.map((wish, index) => (
          <Wish
            key={index}
            tmdbId={wish.id}
            _id={wish._id}
            setToWatch={setToWatch}
          />
        ))
      ) : (
        <p>Sorry, you have got no WatchList!!</p>
      )}
    </div>
  );
};

export default WishList;
