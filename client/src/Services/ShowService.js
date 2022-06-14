const ShowService = {
  getShows: async () => {
    const res = await fetch(`/user/tv/`);
    const data = await res.json();
    return data;
  },

  postShow: async (tvId, details = true) => {
    const res = await fetch(`/user/tv/${tvId}?favourite=${details}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  deleteShowFromFavouriteOrWishList: async (tvId, details = true) => {
    const res = await fetch(`/user/tv/${tvId}?favourite=${details}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
};

export default ShowService;
