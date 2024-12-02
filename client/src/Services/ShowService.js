import { axiosClient } from "./AxiosService";

const ShowService = {
    // Fetch all shows
    getShows: async () => {
        try {
            const res = await axiosClient.get(`/user/tv/`);
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Add a show to favorites or wish list
    postShow: async (tvId, details = true) => {
        try {
            const res = await axiosClient.post(`/user/tv/${tvId}`, null, {
                params: { favourite: details },
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Remove a show from favorites or wish list
    deleteShowFromFavouriteOrWishList: async (tvId, details = true) => {
        try {
            const res = await axiosClient.delete(`/user/tv/${tvId}`, {
                params: { favourite: details },
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Get all favorite shows for the user
    getUsersFavShows: async () => {
        try {
            const res = await axiosClient.get(`/user/tv/fav`);
            return res.data.favourites || [];
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Get all wishlist shows for the user
    getUsersWishlistShows: async () => {
        try {
            const res = await axiosClient.get(`/user/tv/wish`);
            return res.data.wishlist || [];
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};

export default ShowService;
