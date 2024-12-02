import { axiosClient, throwDataOnError } from './AxiosService';

const ShowService = {
  getShows: async () => {
    try {
      const { data } = await axiosClient.get('/user/tv/');
      return data;
    } catch (error) {
      throwDataOnError(error);
    }
  },

  postShow: async (tvId, details = true) => {
    try {
      const { data } = await axiosClient.post(`/user/tv/${tvId}`, null, {
        params: { favourite: details },
      });
      return data;
    } catch (error) {
      throwDataOnError(error);
    }
  },

  deleteShowFromFavouriteOrWishList: async (tvId, details = true) => {
    try {
      const { data } = await axiosClient.delete(`/user/tv/${tvId}`, {
        params: { favourite: details },
      });
      return data;
    } catch (error) {
      throwDataOnError(error);
    }
  },

  getUsersFavShows: async () => {
    try {
      const { data } = await axiosClient.get('/user/tv/fav');
      return data.favourites || [];
    } catch (error) {
      throwDataOnError(error);
    }
  },

  getUsersWishlistShows: async () => {
    try {
      const { data } = await axiosClient.get('/user/tv/wish');
      return data.wishlist || [];
    } catch (error) {
      throwDataOnError(error);
    }
  },
};

export default ShowService;
