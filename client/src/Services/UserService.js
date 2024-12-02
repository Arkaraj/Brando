import { axiosClient, throwDataOnError } from './AxiosService';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  view: (_id) => {
    return axiosClient
      .get(`/user/`)
      .then((res) => res.data)
      .then((data) => {
        // gives all users, extract from them all except mine
        // data is an array
        const otherUser = data.filter((d) => d._id !== _id);
        return otherUser;
      })
      .catch((error) => {
        return throwDataOnError(error);
      });
  },

  allFavMovies: (_id) => {
    return axiosClient
      .get(`/user/movies/${_id}`)
      .then((res) => res.data)
      .then((data) => {
        // data.favourites gives array of all the fav movies
        return data;
      })
      .catch((error) => {
        return throwDataOnError(error);
      });
  },

  rateMovies: (id, score) => {
    const rate = {
      rating: score,
    };

    return axiosClient
      .put(`/user/movies/rating/${id}`, rate, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },

  rateUser: (id, score) => {
    const rate = {
      rating: score,
    };

    return axiosClient
      .put(`/user/rating/${id}`, rate, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },

  updateStatus: (status, id) => {
    const feel = {
      status,
    };

    return axiosClient
      .put(`/user/status/${id}`, feel, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },

  updateVote: (vote, id) => {
    const n = vote ? -1 : 1;
    const upvote = {
      vote: n,
    };

    return axiosClient
      .put(`/user/vote/${id}`, upvote, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return throwDataOnError(error);
      });
  },
};
