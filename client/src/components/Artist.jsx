import React, { useEffect, useState } from 'react';
import Actor from './Actor';
import ArtistSearch from './ArtistSearch';

const Artist = (props) => {
  const [actors, setActors] = useState([]);

  // const [found, setFound] = useState(false)

  const name = props.match.params.actorName;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${name}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setActors(data.results);
      });
  }, [name]);

  return (
    <div>
      <ArtistSearch history={props.history} />

      <div className="gridx">
        {actors.length > 0 ? (
          <>
            {actors.map((actor, index) => (
              // <ActorPanel actor={actor} key={index} />
              <Actor key={index} actor={actor} />
            ))}
          </>
        ) : (
          <>
            {name == null ? (
              <p>Search Actors...</p>
            ) : (
              <p>No user with name: {name}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Artist;
