import React, { useState, useContext } from "react";
import { Route, Link } from "react-router-dom";
import authService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import UserService from "../Services/UserService";
import ProfilePic from "../Images/link.jpg";

const Profile = (props) => {
  const { user, setIsAuthenticated } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [currStatus, setCurrStatus] = useState(user.status);

  const [editable, setEditable] = useState(false);

  const deleteUser = () => {
    authService.delete(user._id).then((data) => {
      setIsAuthenticated(false);
      props.history.push("./");
    });
  };

  const updateStatus = (e) => {
    e.preventDefault();

    UserService.updateStatus(status, user._id).then((data) => {
      setCurrStatus(status);
      alert("Updated!");
    });
  };
  //   const rating = user.rating ? user.rating.toFixed(2) : 0;
  const rating = user.rating;

  // this page needs styling
  return (
    <div className="flex flex-col items-center my-4">
      <Route>
        <div className="bg-white shadow p-4 rounded lg:w-64">
          <div className="flex justify-center mt-4">
            <img
              className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full"
              src={ProfilePic}
              alt="Avatar"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600 font-bold">{user.username}</p>
            <p className="text-sm font-hairline text-gray-600 mt-1">
              {currStatus}{" "}
              <button onClick={() => setEditable(!editable)}>edit</button>
            </p>
          </div>
          <div className="mt-6 flex justify-between text-center">
            <div>
              <p className="text-gray-700 font-bold">{user.views}</p>
              <p className="text-xs mt-2 text-gray-600 font-hairline">Views</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">{rating}</p>
              <p className="text-xs mt-2 text-gray-600 font-hairline">Rating</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">
                <button title="Upvote" className="liked">
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
                {user.upvotes}
              </p>
              <p className="text-xs mt-2 text-gray-700 font-hairline">
                Upvotes
              </p>
            </div>
          </div>

          {editable ? (
            <form onSubmit={updateStatus}>
              <label>Update Status:</label>
              <input
                type="text"
                placeholder="Update Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </form>
          ) : null}

          <div className="mt-6">
            <Link>
              <button
                className="rounded shadow-md w-full items-center bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                onClick={editable ? updateStatus : null}
              >
                Update Status
              </button>
            </Link>
          </div>
          <div className="mt-6">
            <Link>
              <button
                className="rounded shadow-md w-full items-center bg-red-500 px-4 py-2 text-white hover:bg-red-400"
                onClick={deleteUser}
              >
                Delete User
              </button>
            </Link>
          </div>
        </div>
      </Route>
      {/* <h1>
        {" "}
        Your Favourite List Rating is: {rating}, It was Rated {user.views} times
      </h1>
      <h3>Status: {currStatus}</h3>
      <form onSubmit={updateStatus}>
        <label>Update Status:</label>
        <input
          type="text"
          placeholder="Update Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button className="mx-3 px-4 py-2 bg-blue-400 rounded" type="submit">
          Update Status 🖋
        </button>
      </form>
      <button
        className="mx-3 px-4 py-2 bg-red-500 rounded"
        onClick={deleteUser}
      >
        Delete User
      </button> */}
    </div>
  );
};

export default Profile;
