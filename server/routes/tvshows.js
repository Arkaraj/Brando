const router = require("express").Router();
const Show = require("../models/Shows");
const customErrorHandler = require("../helpers/globalErrorHelper");

/**
 * Check if show is present in favourites or in wishlist or not
 */
router.get("/", async (req, res) => {
  try {
    const show = await Show.findOne(
      {
        user: req.user._id,
      },
      { _id: 0, favourites: 1, wishlist: 1 }
    ).lean();

    res.status(200).json({
      msgError: false,
      show,
      favourites: show.favourites,
      wishlist: show.wishlist,
    });
  } catch (err) {
    customErrorHandler(res, undefined, undefined, err);
  }
});

/**
 * Insert Shows to User's favourites or wishlists
 */
router.post("/:id", async (req, res) => {
  const { favourite } = req.query;
  const { tvid } = req.params.id;

  try {
    const show = await Show.findOne(
      {
        user: req.user._id,
      },
      { _id: 0, favourites: 1, wishlist: 1 }
    );

    if (favourite) {
      show.favourites.push(tvid);
      await show.save();
    } else {
      show.wishlist.push(tvid);
      await show.save();
    }

    res.status(200).json({
      msgError: false,
      msg: "Successfully Saved!",
      show,
    });
  } catch (err) {
    customErrorHandler(res, undefined, undefined, err);
  }
});

/**
 * Remove show from user's favourites or wishlists
 */
router.delete("/:id", async (req, res) => {
  const { favourite } = req.query;
  const { tvid } = req.params.id;

  try {
    const show = await Show.findOne(
      {
        user: req.user._id,
      },
      { _id: 0, favourites: 1, wishlist: 1 }
    );

    if (favourite) {
      show.favourites.pull(tvid);
      await show.save();
    } else {
      show.wishlist.pull(tvid);
      await show.save();
    }

    res.status(200).json({
      msgError: false,
      msg: "Successfully Removed",
      show,
    });
  } catch (err) {
    customErrorHandler(res, undefined, undefined, err);
  }
});

module.exports = router;
