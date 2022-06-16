/* eslint-disable array-callback-return */
import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pcase, page, ptype = "" }) => {
  pcase = pcase === "popular" ? pcase : "rated";
  // Converting into Number, toNumber was not working for some reason...
  // page = (page / page) * page;
  page = Number(page);

  const array = [2, 1, 0, -1, -2];

  return (
    <>
      <nav
        className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        <Link
          to={
            ptype ? `/${ptype}/${pcase}/${page - 1}` : `/${pcase}/${page - 1}`
          }
          className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
          title="Previous Page"
        >
          <span className="sr-only">Previous Page</span>
          <svg
            className="block w-4 h-4 fill-current"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z" />
          </svg>
        </Link>

        {array.map((n) => {
          if (page > 2) {
            if (n === 0) {
              return (
                <Link
                  className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black bg-black text-white pointer-events-none"
                  aria-current="page"
                  title="Page 3"
                >
                  {page - n}
                </Link>
              );
            } else {
              return (
                <Link
                  to={
                    ptype
                      ? `/${ptype}/${pcase}/${page - n}`
                      : `/${pcase}/${page - n}`
                  }
                  className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                  title="Page 1"
                >
                  {page - n}
                </Link>
              );
            }
          }
        })}

        <Link
          to={
            ptype ? `/${ptype}/${pcase}/${page + 1}` : `/${pcase}/${page + 1}`
          }
          className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
          title="Next Page"
        >
          <span className="sr-only">Next Page</span>
          <svg
            className="block w-4 h-4 fill-current"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
          </svg>
        </Link>
      </nav>
    </>
  );
};

export default Pagination;
