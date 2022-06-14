import React, { useState, useRef, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "./Message";

const Register = (props) => {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      if (!message.msgError) {
        setUser({ username: "", password: "", email: "" });
        // execute after 2 secs
        timerID = setTimeout(() => {
          props.history.push("./login");
        }, 2000);
      } else {
      }
    });
  };

  return (
    <Route>
      <form onSubmit={Submit}>
        <section className="w-full bg-gradient-to-r from-white via-white to-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
                <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                  <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                    <div className="relative">
                      <p className="mb-2 font-medium text-gray-700 uppercase">
                        Work smarter
                      </p>
                      <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                        Features to help you work smarter
                      </h2>
                    </div>
                    <p className="text-2xl text-gray-700">
                      We've created a simple formula to follow in order to gain
                      more out of your business and your application.
                    </p>
                    <Link
                      to="/"
                      className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                    >
                      Start Surfing Movies 🚀
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full m-12 lg:w-6/12 xl:w-5/12">
                <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-gray-300 rounded-lg shadow-2xl px-7">
                  <h4 className="w-full text-3xl font-bold">Signup</h4>
                  <p className="text-lg text-gray-500">
                    or, if you have an account you can{" "}
                    <Link to="/login" className="text-blue-600 underline">
                      sign in
                    </Link>
                  </p>
                  <div className="relative w-full mt-10 space-y-8">
                    <div className="relative">
                      <label className="font-medium text-gray-900">Name</label>
                      <div className="block mb-4 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          name="username"
                          className="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Enter Your Name"
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="font-medium text-gray-900">Email</label>
                      <div className="block mb-4 border border-gray-200 rounded-lg">
                        <input
                          type="email"
                          name="email"
                          className="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Enter Your Email Address"
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="font-medium text-gray-900">
                        Password
                      </label>
                      <div className="block mb-4 border border-gray-200 rounded-lg">
                        <input
                          type="password"
                          name="password"
                          className="block w-full px-4 py-3 border-2 border-transparent rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Password"
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <button className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease">
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
      {message ? <Message message={message} /> : null}
    </Route>
  );
};

export default Register;
