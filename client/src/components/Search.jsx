import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ history, navbar = false, footer = false }) => {
  const [text, setText] = useState("");

  const Submit = (e) => {
    e.preventDefault();

    if (text.length < 1) {
      alert("Plese enter a search term");
      return;
    }
    const searchTerm = text.toLowerCase().replace(/ /g, "+");

    history.push(`/search/${searchTerm}`);
  };
  let formClass = navbar ? "z-50" : footer ? "flex justify-center" : "p-8 z-50";

  return (
    <form className={formClass} onSubmit={Submit}>
      <div
        className={
          navbar
            ? "bg-transparent w-full flex items-center rounded-none border-b-2 focus-within:border-blue-500"
            : "bg-transparent w-full sm:w-1/4 h-1/2 flex items-center rounded-none border-b-2 focus-within:border-blue-500"
        }
      >
        <input
          className="bg-transparent w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Try 'The Lord of the Rings' "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="p-1">
          <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
            <BsSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
