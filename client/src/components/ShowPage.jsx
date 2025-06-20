import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Tag from "./Tag";
import Actor from "./Actor";
import Search from "./Search";
import Shows from "./Shows";
import ShowService from "../Services/ShowService";

const poster = "http://image.tmdb.org/t/p/w154/";

/**
 * Checks if the id is present in the Shows favourite or not.
 * @param {Number[]} array This is the array of numbers
 * @param {Number} tvId The id to check
 * @returns {Boolean} Returns if the number is is found or not
 */
const isPresentInShows = (array, tvId) => {
  return array.includes(tvId);
};

const MoviePage = (props) => {
  const id = props.match.params.id;

  const [data, setData] = useState([]);

  const [image, setImage] = useState("");

  const [genre, setGenre] = useState([]);

  const [trailer, setTrailer] = useState("");

  const [cast, setCast] = useState([]);

  const [similar, setSimilar] = useState([]);

  const [loaded, isLoaded] = useState(false);

  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { isAuthenticated } = useContext(AuthContext);

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  const youtube = "https://www.youtube.com/embed/";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
        // setName(data.original_title)
        // setDescription(data.overview)
        setGenre(data.genres);
        const image_path = data.poster_path ? poster + data.poster_path : "";
        setImage(image_path);
        isLoaded(true);
      });

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // List of all videos data.results
        //https://youtu.be/data.results[0].key
        if (data.results) {
          if (data.results[0]) {
            if (data.results[0].key != null) {
              setTrailer(youtube + data.results[0].key);
            }
          } else {
            setTrailer("");
            return;
          }
        } else {
          return;
        }
      });

    // /movie/{movie_id}/credits

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cast) {
          setCast(data.cast);
        } else {
          return;
        }
      });

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
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (data.results) {
          if (isAuthenticated) {
            let fullData = data.results;

            let arrayId = fullData.map((d) => d.id);

            let newData = await newShowObject(arrayId, fullData);

            setSimilar(newData);
          } else {
            setSimilar(data.results);
          }
        } else {
          return;
        }
      });
  }, [id, isAuthenticated]);

  const {
    original_name,
    name,
    overview,
    first_air_date,
    tagline,
    vote_average,
    episode_run_time,
    number_of_seasons,
    number_of_episodes,
    created_by,
  } = data;

  let tag = tagline ? tagline : "None";

  //let genre = genres.map(gen => gen.name)
  const BackDrop_Path = "http://image.tmdb.org/t/p/w1280//";

  // Styling

  const bgImage = {
    backgroundImage: `url(${BackDrop_Path + data.backdrop_path})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const seasons = (data.seasons || []).filter((s) => s.season_number !== 0);
        const episodeCount =
    selectedSeason && seasons.length
      ? seasons.find((s) => s.season_number === Number(selectedSeason))?.episode_count || 1
      : 1;

  return (
    <>
      {loaded ? (
        original_name === "" ? (
          <div className="loading"></div>
        ) : (
          <div>
            <div className="MovieWrapper" id="Movie" style={bgImage}>
              <div className="flex-col">
                <div className="MovieInfo">
                  <img
                    src={image === "" ? noImage : image}
                    className={image === "" ? "noImage" : ""}
                    alt={data.title}
                  />
                  <div>
                    <div className="sm:flex sm:justify-between">
                      <h2 className="font-bold text-2xl">
                        {name}{" "}
                        {first_air_date ? (
                          <span>({first_air_date.split("-")[0]})</span>
                        ) : (
                          ""
                        )}
                      </h2>
                      {genre
                        ? genre.map((gen, index) => (
                            <Tag key={index} genre={gen.name} />
                          ))
                        : null}
                    </div>
                    <h3>
                      Creators:{" "}
                      {created_by.length > 0 ? (
                        created_by.map((dir, index) => (
                          <span className="pl-1">
                            {dir.name}
                            {index === created_by.length - 1 ? null : ","}
                          </span>
                        ))
                      ) : (
                        <span className="pl-1">Can't find the Creator</span>
                      )}
                    </h3>
                    <h3>Rating: {vote_average}</h3>
                    {/* <h3>Date of Release: {release_date}</h3> */}
                    <h3>
                      Run Time:{" "}
                      {episode_run_time.map((rt, index) => (
                        <span className="pl-1">
                          {rt + " min"}
                          {index === episode_run_time.length - 1 ? null : ","}
                        </span>
                      ))}
                    </h3>
                    <h3>No. of Seasons: {number_of_seasons}</h3>
                    <h3>Total No. of Episodes: {number_of_episodes}</h3>
                    <h4>Plot</h4>
                    <hr />
                    <p>{overview}</p>
                    <h4>Tag Line</h4>
                    <hr />
                    <p>{tag}</p>
                    <h4 className="font-bold text-xl">Trailer</h4>
                    <hr />
                    {/* <p> {isAuthenticated ? 'Your Rating:' : null}</p> */}
                    <div id="video">
                      {trailer ? (
                        <iframe
                          title={`${name} trailer`}
                          width="560"
                          height="315"
                          className="mt-2"
                          src={`${trailer}`}
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <p>The Trailer couldn't be loaded</p>
                      )}
                    </div>
                    <br />
                    {/* <a
                      className="text-xl text-blue-500 hover:underline"
                      href={`https://m4uhd.cc/search/${name}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Show
                    </a> */}
                    <button
                    className="text-xl text-blue-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                    onClick={() => setShowPlayer(true)}
                    type="button"
                  >
                    Watch Show
                  </button>
                  {showPlayer && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                      }}
                      onClick={() => setShowPlayer(false)}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "80vw",
                          height: "80vh",
                          background: "#000",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 1001,
                            background: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            fontSize: 18,
                            cursor: "pointer",
                          }}
                          onClick={() => setShowPlayer(false)}
                        >
                          ×
                        </button>
                        <div style={{ marginBottom: 16 }}>
                          <label>
                            Season:{" "}
                            <select
                              value={selectedSeason || ""}
                              onChange={(e) => {
                                setSelectedSeason(e.target.value);
                                setSelectedEpisode(1);
                              }}
                            >
                              <option value="" disabled>
                                Select Season
                              </option>
                              {seasons.map((season) => (
                                <option
                                  key={season.season_number}
                                  value={season.season_number}
                                >
                                  {season.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          {selectedSeason && (
                            <label style={{ marginLeft: 16, color: "black" }}>
                              Episode:{" "}
                              <select
                                value={selectedEpisode}
                                onChange={(e) =>
                                  setSelectedEpisode(Number(e.target.value))
                                }
                              >
                                {Array.from(
                                  { length: episodeCount },
                                  (_, i) => i + 1
                                ).map((ep) => (
                                  <option key={ep} value={ep}>
                                    {ep}
                                  </option>
                                ))}
                              </select>
                            </label>
                          )}
                        </div>
                        {selectedSeason && selectedEpisode && (
                          <iframe
                            src={`https://vidsrc.me/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`}
                            style={{ width: "100%", height: "80%", color: "black" }}
                            frameBorder="0"
                            referrerPolicy="origin"
                            allowFullScreen
                            title="Watch Show"
                          ></iframe>
                        )}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
                <div className="bg-white">
                  <h1 className="font-bold text-2xl underline">Actors</h1>
                  <div className="gridx actors">
                    {cast.length > 0
                      ? cast
                          .slice(0, 6)
                          .map((actor, index) => (
                            <Actor key={index} actor={actor} />
                          ))
                      : "Couldn't find any Actors for the movie"}
                  </div>
                  <h1 className="font-bold text-2xl underline">
                    Similar Shows:
                  </h1>
                  <div className="gridx">
                    {similar.length > 0
                      ? similar.map((show, index) => (
                          <Shows key={index} show={show} />
                        ))
                      : "Couldn't find any Similar movies for the movie"}
                  </div>
                  <h1 className="mb-1 text-2xl font-medium text-center">
                    Looking for something else? Search our reviews:
                  </h1>
                  <div className="">
                    <Search
                      setMovies={props.setMovies}
                      history={props.history}
                      footer={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default MoviePage;
