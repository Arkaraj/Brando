const ShowService = {
  getShows: async () => {
    const res = await fetch(`/user/tv/`);
    const data = await res.json();
    return data;
  },

  postShow: async (tvId) => {
    const schemaWish = {
      wish: true,
    };

    const res = await fetch(`/user/tv/${tvId}`, {
      method: "POST",
      body: JSON.stringify(schemaWish),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  deleteShowFromFavouriteOrWishList: async (id) => {
    const res = await fetch(`/user/tv/${id}`, {
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
