import { backendUrl } from '../constants/constants';

const ShowService = {
  getShows: async () => {
    const res = await fetch(`${backendUrl}/user/tv/`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  },

  postShow: async (tvId, details = true) => {
    const res = await fetch(
      `${backendUrl}/user/tv/${tvId}?favourite=${details}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  },

  deleteShowFromFavouriteOrWishList: async (tvId, details = true) => {
    const res = await fetch(
      `${backendUrl}/user/tv/${tvId}?favourite=${details}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  },

  getUsersFavShows: async () => {
    const res = await fetch(`${backendUrl}/user/tv/fav`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data.favourites || [];
  },

  getUsersWishlistShows: async () => {
    const res = await fetch(`${backendUrl}/user/tv/wish`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data.wishlist || [];
  },
};

export default ShowService;
