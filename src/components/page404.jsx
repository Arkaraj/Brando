import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Error404 from "../Images/404.svg";

function page404() {
  return (
    <>
      <img src={Error404} alt="React Logo" />
      <Link
        to="/"
        className="button404 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Go Back to Home Page <BsArrowRight style={{ marginLeft: "0.2rem" }} />
      </Link>
    </>
  );
}

export default page404;
