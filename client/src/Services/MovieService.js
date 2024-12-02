import { axiosClient } from "./AxiosService";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // Get the user's wish list
    getWishList: (id) => {
        return axiosClient.get(`/user/movies/wishlist/${id}`)
            .then((res) => res.data.wishlist)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },

    // Check if a specific movie is in the user's wish list
    getMovieWishList: (userId, tmdbId) => {
        return axiosClient.get(`/user/movies/wishlist/${userId}/${tmdbId}`)
            .then((res) => {
                const { msgError, wish } = res.data;
                return msgError ? false : wish;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },

    // Add a movie to the user's wish list
    postWish: (tmdbId) => {
        const schemaWish = { wish: true };

        return axiosClient.post(`/user/movies/wishlist/${tmdbId}`, schemaWish, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },

    // Remove a movie from the user's wish list
    deleteWish: (id) => {
        return axiosClient.delete(`/user/movies/wishlist/${id}`, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    },
};
