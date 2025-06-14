import React, { useState, useEffect } from "react";
import Movies from "./Movies";

const Person = (props) => {
  const personId = props.match.params.id;

  const [actor, setActor] = useState([]);

  const [actorMovies, setActorMovies] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const getActor = async (id) => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setActor(data);
      });
  };

  const getActorMovies = async (id) => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.cast)
        if (data.cast) setActorMovies(data.cast)
      });
  };

  useEffect(() => {
    const fetchData = async (id) => {
      await getActor(id);
      await getActorMovies(id);
      setLoaded(true);
    };

    fetchData(personId);
  }, [personId]);

  const { name, biography, profile_path } = actor;
  // /tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg
  const image = "http://image.tmdb.org/t/p/w300_and_h450_bestv2" + profile_path;

  return (
    <>
      {loaded ? (
        <div>
          <div className="flex sm:flex-row flex-col m-4">
            <div className="mx-auto">
              <img src={image} className="rounded-md" alt={name} />
            </div>
            <div className="w-full text-justify mx-3">
              <h1 className="text-xl font-bold leading-none text-black sm:text-2xl md:text-4xl text-center sm:text-left">
                {name}
              </h1>
              <h4 className="mt-3 mb-2 text-2xl font-medium">Biography:</h4>
              <p style={{ marginRight: "5%" }}>{biography}</p>
            </div>
          </div>
          <h4 className="m-4 mt-6 text-2xl font-medium">Known For:</h4>
          <div className="gridx">
            {actorMovies.length > 0 ? (
              actorMovies.map((mov) => <Movies movie={mov} />)
            ) : (
              <p>No Movies</p>
            )}
          </div>
        </div>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Person;
