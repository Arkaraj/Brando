// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // For getting userswishList

  getWishList: (id) => {
    return fetch(`/user/movies/wishlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        return data.wishlist;
      });
  },

  getMovieWishList: (userId, tmdbId) => {
    return fetch(`/user/movies/wishlist/${userId}/${tmdbId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.msgError) {
          return false;
        } else {
          return data.wish;
        }
      });
  },

  postWish: (tmdbId) => {
    const schemaWish = {
      wish: true,
    };

    return fetch(`/user/movies/wishlist/${tmdbId}`, {
      method: "POST",
      body: JSON.stringify(schemaWish),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  deleteWish: (id) => {
    return fetch(`/user/movies/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
