import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import UserService from "../Services/UserService";
import ProfilePic from "../Images/link.jpg";

const Other = ({ other }) => {
  const { username, rating, _id, views, status, upvotes } = other;

  const [vote, setVote] = useState(false);
  const [upvote, setUpVote] = useState(upvotes);

  const updateUpvote = () => {
    UserService.updateVote(vote, _id).then((data) => {
      setVote(!vote);
    });
    vote ? setUpVote((vote) => vote - 1) : setUpVote((vote) => vote + 1);
  };

  // https://tailwindtemplates.io/wp-content/uploads/2019/03/link.jpg

  return (
    <Route>
      <div className="bg-white shadow p-4 rounded lg:w-64">
        <div className="text-center mt-4">
          <p className="text-gray-600 font-bold">{username}</p>
          <p className="text-sm font-hairline text-gray-600 mt-1">{status}</p>
        </div>
        <div className="flex justify-center mt-4">
          <img
            className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full"
            src={ProfilePic}
            alt="Avatar"
          />
        </div>
        <div className="mt-6 flex justify-between text-center">
          <div>
            <p className="text-gray-700 font-bold">{views}</p>
            <p className="text-xs mt-2 text-gray-600 font-hairline">Views</p>
          </div>
          <div>
            <p className="text-gray-700 font-bold">{rating.toFixed(2)}</p>
            <p className="text-xs mt-2 text-gray-600 font-hairline">Rating</p>
          </div>
          <div>
            <p className="flex flex-row justify-center items-center text-gray-700 font-bold">
              <button
                onClick={updateUpvote}
                title="Upvote"
                className={vote ? "liked" : "upvote"}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  className="icon"
                >
                  <path
                    d="M13.162 3.813a2 2 0 01.465.465l6.674 9.343a1 1 0 01-1.102 1.539l-4.032-1.21a1 1 0 00-1.277.816l-.767 5.375a1 1 0 01-.99.859h-.266a1 1 0 01-.99-.859l-.767-5.375a1 1 0 00-1.278-.816l-4.031 1.21a1 1 0 01-1.102-1.54l6.674-9.342a2 2 0 012.79-.465z"
                    fill="currentcolor"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              {upvote}
            </p>
            <p className="text-xs mt-2 text-gray-700 font-hairline">Upvotes</p>
          </div>
        </div>
        <div className="mt-6">
          <Link to={{ pathname: `/connect/${_id}`, state: other }}>
            <button className="rounded shadow-md w-full items-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
              Check out There List
            </button>
          </Link>
        </div>
      </div>
    </Route>
  );
};

export default Other;
