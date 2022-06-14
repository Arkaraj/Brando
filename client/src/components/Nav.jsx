import React, { useState, useEffect, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { SiThemoviedatabase } from "react-icons/si";
import brandoLogo from "../Images/brando.png";
import Search from "./Search";
import { slide as Menu } from "react-burger-menu";

// Git version to view what was here

const Nav = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const [searchToggle, setSearchToggle] = useState(false);

  const logoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unAuthenticatedNavBar = () => {
    return (
      <>
        {/* <Link to="/login" className="link">Login</Link>
                <Link to='/register' className="link">Register</Link> */}
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div className="cursor-pointer mx-auto flex flex-row items-center">
            {searchToggle ? (
              <AiOutlineCloseCircle
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(false)}
              />
            ) : (
              <BsSearch
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(!searchToggle)}
              />
            )}
            {searchToggle ? (
              <Search history={history} setMovies={setMovies} navbar={true} />
            ) : null}
          </div>
          <Link
            to="/login"
            className="whitespace-nowrap text-base font-medium text-gray-800 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign up
          </Link>
        </div>
      </>
    );
  };

  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  const isAuthenticatedNavBar = () => {
    return (
      <>
        {/* <Link to="/profile" className="link">{user.username}</Link>
                <Link to="/favourite" className="link">Favorites</Link>
                <Link to="/wishlist" className="link">WishList</Link>
                <Link to='/connect' className="link">See other Users</Link>
                <Link className="link btn" onClick={logoutHandler}>
                    Logout
                    </Link> */}
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div className="cursor-pointer mx-auto items-center flex flex-row">
            {searchToggle ? (
              <AiOutlineCloseCircle
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(false)}
              />
            ) : (
              <BsSearch
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(!searchToggle)}
              />
            )}
            {searchToggle ? (
              <Search history={history} setMovies={setMovies} navbar={true} />
            ) : null}
          </div>
          <Link
            onClick={handleSideBar}
            className="whitespace-nowrap font-bold text-lg text-gray-800 hover:text-gray-900"
          >
            {user.username}
          </Link>
          <Menu right customBurgerIcon={false} isOpen={sideBar}>
            <Link
              to="/profile"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {user.username}
            </Link>
            <Link
              to="/favourite"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Favorites
            </Link>
            <Link
              to="/wishlist"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              WishList
            </Link>
            <Link
              to="/connect"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Other Users
            </Link>
          </Menu>

          {/* Sidebar */}

          {/* <Link
            to="/favourite"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Favorites
          </Link>
          <Link
            to="/wishlist"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            WishList
          </Link>
          <Link
            to="/connect"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Other Users
          </Link> */}
          <Link
            onClick={logoutHandler}
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </Link>
        </div>
      </>
    );
  };

  const unAuthenticatedMobileNavBar = () => {
    return (
      <>
        {searchToggle ? (
          <AiOutlineCloseCircle
            style={{ fontWeight: "bold", fontSize: 18 }}
            onClick={() => setSearchToggle(false)}
          />
        ) : (
          <>
            <Link
              to="/search/godfather"
              className="flex flex-row justify-items-center items-center text-base font-medium text-gray-900 hover:text-gray-700"
            >
              Search For Movies
              <BsSearch
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(!searchToggle)}
              />
            </Link>
          </>
        )}
        {searchToggle ? (
          <Search history={history} setMovies={setMovies} navbar={true} />
        ) : null}
        <div className="menu">
          <Link
            to="/register"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign up
          </Link>
          <p className="mt-6 text-center text-base font-medium text-gray-500">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </>
    );
  };

  const AuthenticatedMobileNavBar = () => {
    return (
      <>
        <hr />
        <div className="py-6 px-5 space-y-6">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <Link
              to="/profile"
              className="text-base font-medium text-gray-900 hover:text-gray-700"
            >
              {user.username}
            </Link>
            <Link
              to="/favourite"
              className="text-base font-medium text-gray-900 hover:text-gray-700"
            >
              Favourites
            </Link>
            <Link
              to="/wishlist"
              className="text-base font-medium text-gray-900 hover:text-gray-700"
            >
              WishList
            </Link>
            <Link
              to="/connect"
              className="text-base font-medium text-gray-900 hover:text-gray-700"
            >
              Other Users
            </Link>
            {searchToggle ? (
              <AiOutlineCloseCircle
                style={{ fontWeight: "bold", fontSize: 18 }}
                onClick={() => setSearchToggle(false)}
              />
            ) : (
              <>
                <Link
                  to="/search/godfather"
                  className="flex flex-row justify-items-center items-center text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Search For Movies
                  <BsSearch
                    style={{ fontWeight: "bold", fontSize: 18 }}
                    onClick={() => setSearchToggle(!searchToggle)}
                  />
                </Link>
              </>
            )}
            {searchToggle ? (
              <Search history={history} setMovies={setMovies} navbar={true} />
            ) : null}
          </div>
        </div>
        <div>
          <Link
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
            onClick={logoutHandler}
          >
            Logout
          </Link>
        </div>
      </>
    );
  };

  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const [flyerTwo, setFlyerTwo] = useState(false);
  const { history, setMovies } = props;
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    // setScrolling(e.target.scrollTop > 300);
    if (window.scrollY >= 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  // const handleCrossClick = () => {
  //   setSideBar(false);
  // };

  useEffect(() => {
    // const burgerCrossButton = document.querySelector("#react-burger-cross-btn");
    // burgerCrossButton.addEventListener("click", handleCrossClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      // burgerCrossButton.removeEventListener("click", handleCrossClick);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // for testing
  let done = true;

  return (
    <nav
      className={
        scrolling
          ? "blur transition delay-150 duration-300 ease-in-out"
          : " transition delay-150 duration-300 ease-in-out"
      }
    >
      {done ? (
        <>
          {/* Tailwind CSS v2.0+ */}
          <div
            className={scrolling ? "relative z-30" : "relative bg-white z-30"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className={
                  scrolling
                    ? "flex justify-between items-center py-6 md:justify-start md:space-x-10"
                    : "flex justify-between items-center border-b-2 border-gray-100 border-opacity-20 py-6 md:justify-start md:space-x-10"
                }
              >
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link to="/">
                    <span className="sr-only">Brando</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src={brandoLogo}
                      alt="Brando"
                    />
                    {/* <SiThemoviedatabase
                  className="text-blue-500"
                  style={{ transform: "scale(3)" }}
                /> */}
                  </Link>
                </div>
                <div className="-mr-2 -my-2 md:hidden">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Open menu</span>
                    {/* Heroicon name: outline/menu */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="hidden md:flex space-x-10">
                  <div className="relative">
                    {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                    <button
                      type="button"
                      className="
                     group bg-white p-1 bg-opacity-90 rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 pb-8'
                    "
                      onClick={() => {
                        setFlyer(!flyer);
                        setFlyerTwo(false);
                      }}
                    >
                      <span>Movies</span>
                      {/*
                Heroicon name: solid/chevron-down
  
                Item active: "text-gray-600", Item inactive: "text-gray-400"
              */}
                      <svg
                        className={
                          flyer === true
                            ? "transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                            : "ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div
                      onMouseLeave={() => setFlyer(false)}
                      className={
                        flyer
                          ? " opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                          : "hidden opacity-0 translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                      }
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            to="/popular/1"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/chart-bar */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Popular
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get the most popular movies of the time.
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/rated/1"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/cursor-click */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Top Rated
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get the top rated movies, rating is according to
                                TMDB users.
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/genres"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/shield-check */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Genres
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                List of all genres in TMDB.
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          <div className="flow-root">
                            <Link
                              to="/search/godfather"
                              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                            >
                              {/* Heroicon name: outline/play */}
                              <FiSearch />
                              <span className="ml-3">Search</span>
                            </Link>
                          </div>
                          <div className="flow-root">
                            <Link
                              to="/contact"
                              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                            >
                              {/* Heroicon name: outline/phone */}
                              <svg
                                className="flex-shrink-0 h-6 w-6 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <span className="ml-3">Contact</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/actor"
                    className="text-base p-1 font-medium text-gray-900 hover:text-gray-500 hover:underline"
                  >
                    Actors
                  </Link>
                  <Link
                    to="/about"
                    className="text-base p-1 font-medium text-gray-900 hover:text-gray-500 hover:underline"
                  >
                    About
                  </Link>
                  <div className="relative">
                    {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                    <button
                      type="button"
                      className="group bg-white p-1 bg-opacity-90 rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setFlyerTwo(!flyerTwo);
                        setFlyer(false);
                      }}
                    >
                      <span>TV</span>
                      {/*
                Heroicon name: solid/chevron-down
  
                Item active: "text-gray-600", Item inactive: "text-gray-400"
              */}
                      <svg
                        className={
                          flyerTwo === true
                            ? "transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200"
                            : "ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/*
              'More' flyout menu, show/hide based on flyout menu state.
  
              Entering: "transition ease-out duration-200"
                From: "opacity-0 translate-y-1"
                To: "opacity-100 translate-y-0"
              Leaving: "transition ease-in duration-150"
                From: "opacity-100 translate-y-0"
                To: "opacity-0 translate-y-1"
            */}{" "}
                    <div
                      onMouseLeave={() => setFlyerTwo(false)}
                      className={
                        flyerTwo
                          ? " opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                          : "hidden opacity-0 translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                      }
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            to="/contact"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/support */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Help Center
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get all of your questions answered in our forums
                                or contact support.
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/tv/popular/1"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/bookmark-alt */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Popular TV shows
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get the most popular shows that ever existed.
                                Rated by TMDB users
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/tv/rated/1"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/calendar */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                Top Rated
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get the top rated TV shows.
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/"
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            {/* Heroicon name: outline/shield-check */}
                            <svg
                              className="flex-shrink-0 h-6 w-6 text-blue-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                On The Air
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Get the latest, ongoing episodes and TV series.
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                              Recent Posts
                            </h3>
                            <ul className="mt-4 space-y-4">
                              <li className="text-base truncate">
                                <Link
                                  to="/"
                                  className="font-medium text-gray-900 hover:text-gray-700"
                                >
                                  Boost your conversion rate
                                </Link>
                              </li>
                              <li className="text-base truncate">
                                <Link
                                  to="/"
                                  className="font-medium text-gray-900 hover:text-gray-700"
                                >
                                  How to use search engine optimization to drive
                                  traffic to your site
                                </Link>
                              </li>
                              <li className="text-base truncate">
                                <Link
                                  to="/"
                                  className="font-medium text-gray-900 hover:text-gray-700"
                                >
                                  Improve your customer experience
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <Link
                              to="/"
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              {" "}
                              View all posts <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Search setMovies={[]} history={props.history} /> */}
                  {/* Search */}
                  {/* <div className="md:flex items-center justify-end md:flex-1">
                <BsSearch />
              </div> */}
                </nav>
                {/* Unauthbar */}
                {isAuthenticated
                  ? isAuthenticatedNavBar()
                  : unAuthenticatedNavBar()}
              </div>
            </div>
            {/*
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
        From: ""
        To: ""
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    */}

            <div
              className={
                open
                  ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transform origin-top-right md:hidden"
                  : "hidden opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              }
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        onClick={() => setOpen(!open)}
                      >
                        <span className="sr-only">Close menu</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      <Link
                        to="/popular/1"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        {/* Heroicon name: outline/chart-bar */}
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Popular Movies
                        </span>
                      </Link>
                      <Link
                        to="/rated/1"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        {/* Heroicon name: outline/cursor-click */}
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                          />
                        </svg>
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Top Rated Movies
                        </span>
                      </Link>
                      <Link
                        to="/genres"
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        {/* Heroicon name: outline/shield-check */}
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Movie Genres
                        </span>
                      </Link>
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      TV shows
                    </Link>
                    <Link
                      to="/actor"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Actors
                    </Link>
                    <Link
                      to="/about"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Help Center
                    </Link>
                  </div>
                  {isAuthenticated
                    ? AuthenticatedMobileNavBar()
                    : unAuthenticatedMobileNavBar()}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <Search history={history} setMovies={setMovies} />
        <Menu right customBurgerIcon={<h2>hello</h2>}>
          <Link
            to="/profile"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {user.username}
          </Link>
          <Link
            to="/favourite"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Favorites
          </Link>
          <Link
            to="/wishlist"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            WishList
          </Link>
          <Link
            to="/connect"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Other Users
          </Link>
        </Menu>
      )}
    </nav>
  );
};

export default Nav;
