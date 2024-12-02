import { axiosClient } from './AxiosService';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // For getting user's wishList
  getWishList: (id) => {
    return axiosClient
      .get(`/user/movies/wishlist/${id}`)
      .then((response) => response.data.wishlist);
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
