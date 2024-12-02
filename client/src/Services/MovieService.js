import { axiosClient, throwDataOnError } from './AxiosService';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // For getting user's wishList
  getWishList: (id) => {
    return axiosClient
      .get(`/user/movies/wishlist/${id}`)
      .then((response) => response.data.wishlist);
  },
  getUserMovie: async (userId, movieId) => {
    try {
      const { data } = await axiosClient.get(
        `/user/movies/${userId}/${movieId}`
      );
      return data;
    } catch (error) {
      return throwDataOnError(error);
    }
  },
  deleteMovieFromServer: async (movieId) => {
    try {
      return await axiosClient.delete(`/user/movies/${movieId}`);
    } catch (error) {
      return false;
    }
  },
  getUsersFavMovies: async (userId) => {
    try {
      const { data } = await axiosClient.get(`/user/movies/${userId}`);
      return data.favourites || [];
    } catch (error) {
      console.log('Error while fetching favourite movies: ', error);
      return [];
    }
  },
  toggleUserMovieFav: async (movieId, movieData) => {
    try {
      return await axiosClient.put(`/user/movies/${movieId}`, movieData);
    } catch (error) {
      console.log('Error while fetching favourite movies: ', error);
      return [];
    }
  },
  getMovieWishList: (userId, tmdbId) => {
    return axiosClient
      .get(`/user/movies/wishlist/${userId}/${tmdbId}`)
      .then((response) => {
        if (response.data.msgError) {
          return false;
        } else {
          return response.data.wish;
        }
      })
      .catch(() => false);
  },

  postWish: (tmdbId) => {
    const schemaWish = {
      wish: true,
    };

    return axiosClient
      .post(`/user/movies/wishlist/${tmdbId}`, schemaWish)
      .then((response) => response.data);
  },

  deleteWish: (id) => {
    return axiosClient
      .delete(`/user/movies/wishlist/${id}`)
      .then((response) => response.data);
  },
};
