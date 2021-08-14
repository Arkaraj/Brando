import React, { useState, useEffect } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import Shows from "./Shows";

const TvPopular = (props) => {
  const [shows, setShows] = useState([]);

  let pageNumber = props.match.params.page || 1;

  pageNumber = isNaN(pageNumber) ? 0 : pageNumber;

  pageNumber = pageNumber === 0 ? 0 : (pageNumber * pageNumber) / pageNumber;

  useEffect(() => {
    if (pageNumber < 1) {
      props.history.push("/");
    }

    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results);
      });
  }, [pageNumber, props.case, props.history]);

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
