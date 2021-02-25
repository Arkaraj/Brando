import React from 'react';
import { Route, Link } from 'react-router-dom'

const Other = ({ other }) => {
    const { username, rating, _id, views, status } = other
    return (
        <Route>
            <div className="bg-white shadow p-4 rounded lg:w-64">
                <div className="text-center mt-4">
                    <p className="text-gray-600 font-bold">{username}
                    </p>
                    <p className="text-sm font-hairline text-gray-600 mt-1">{status}
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <img className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full" src="https://tailwindtemplates.io/wp-content/uploads/2019/03/link.jpg" alt="Avatar" />
                </div>
                <div className="mt-6 flex justify-between text-center">
                    <div>
                        <p className="text-gray-700 font-bold">{views}
                        </p>
                        <p className="text-xs mt-2 text-gray-600 font-hairline">Views
            </p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-bold">{rating.toFixed(2)}
                        </p>
                        <p className="text-xs mt-2 text-gray-600 font-hairline">Rating
            </p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-bold">530
            </p>
                        <p className="text-xs mt-2 text-gray-700 font-hairline">Shares
            </p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to={{ pathname: `/connect/${_id}`, state: other }}>
                        <button className="rounded shadow-md w-full items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
                            Check out There List
                       </button>
                    </Link>
                </div>
            </div>
        </Route>
    );
}

export default Other;
