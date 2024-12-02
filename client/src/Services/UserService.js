import { axiosClient } from "./AxiosService";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // Get a list of all users except the current user
    view: async (_id) => {
        try {
            const res = await axiosClient.get(`/user/`);
            const otherUser = res.data.filter((d) => d._id !== _id);
            return otherUser;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Get all favorite movies for a specific user
    allFavMovies: async (_id) => {
        try {
            const res = await axiosClient.get(`/user/movies/${_id}`);
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Rate a specific movie
    rateMovies: async (id, score) => {
        try {
            const rate = { rating: score };
            const res = await axiosClient.put(`/user/movies/rating/${id}`, rate, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Rate a specific user
    rateUser: async (id, score) => {
        try {
            const rate = { rating: score };
            const res = await axiosClient.put(`/user/rating/${id}`, rate, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Update the status of a user
    updateStatus: async (status, id) => {
        try {
            const feel = { status };
            const res = await axiosClient.put(`/user/status/${id}`, feel, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // Update vote count for a user
    updateVote: async (vote, id) => {
        try {
            const n = vote ? -1 : 1;
            const upvote = { vote: n };
            const res = await axiosClient.put(`/user/vote/${id}`, upvote, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
