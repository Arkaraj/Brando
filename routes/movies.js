const express = require("express");
const router = express.Router();
const Movies = require("../models/favourite");
const Users = require("../models/User");

const wish = require("./wishlist");

// WishList
router.use("/wishlist", wish);

// For all entries, Not necessery
router.get("/", async (req, res) => {
  const movie = await Movies.find().lean();

  res.status(200).send(movie);
});

// get movies of particular/Specific User, with _id
router.get("/:_id", async (req, res) => {
  // _id: req.user._id
  Users.findById({ _id: req.params._id })
    .populate("favourites")
    .exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msg: "Error has occured", msgError: true, err } });
      else {
        res.status(200).json({
          favourites: document.favourites,
          authenticated: true,
          message: { msgError: false },
        });
      }
    });
});

router.get("/:_id/:id", (req, res) => {
  Users.findById({ _id: req.params._id })
    .populate("favourites")
    .exec((err, document) => {
      if (err) {
        console.log("ERR: " + err);
        res
          .status(500)
          .json({ message: { msg: "Error has occured", msgError: true } });
      } else {
        // document.favourites time complex: O(n)
        const tid = document.favourites.map((fav) => fav.id);
        const check = tid.includes(req.params.id);
        if (check) {
          const fav = document.favourites.filter(
            (fav) => fav.id == req.params.id
          );
          res.status(200).json({ fav: fav[0] });
        } else {
          res.status(404).json({
            message: { msg: "Movie not in Favourites", msgError: true },
          });
        }
      }
    });
});

// To add to favourites of an individual user, _id: user's id
router.post("/", async (req, res) => {
  const { id, fav } = req.body;
  let movie = new Movies({ id, fav });

  movie.save((err) => {
    if (err) {
      console.log("Error: " + err);
      res
        .status(500)
        .json({ message: { msg: "Error has occured", msgError: true } });
    } else {
      req.user.favourites.push(movie);
      req.user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msg: "Error has occured", msgError: true } });
        } else res.status(200).json(movie);
      });
    }
  });
});

router.put("/rating/:_id", (req, res) => {
  const { rating } = req.body;

  Movies.findById(req.params._id, (err, movie) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      movie.rating = rating;
      movie.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Could not Update Rating", msgError: true });
        } else {
          res.status(200).json(movie);
        }
      });
    }
  });
});

router.put("/:_id", async (req, res) => {
  const { id, fav } = req.body;
  // Should pass _id instead

  Movies.findById(req.params._id, (err, movie) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      movie.id = id;
      movie.fav = fav;

      movie.save((err) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json(movie);
        }
      });
    }
  });
});

router.delete("/:_id", async (req, res) => {
  /*try {
        const favUser = await Users.findOne({ _id: req.params._id })
        const movie = favUser.favourites.filter(mov => mov.id !== parseInt(req.params.id))
        try {
            await Users.updateOne({ _id: req.params._id }, { $set: { favourites: movie } })

            res.status(200).json({ msg: "Deleted Movie" })
        } catch (err) {
            console.log('Error: ' + err);
            res.status(500).json({ error: "Internal server error" })
        }

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: "Internal server error" })
    }
    
    // For Developers, to Delete all the favourites
    req.user.favourites = []
    req.user.save(err => {
        if (err) {
            res.status(500).json({ msg: "Internal Error" })
        }
        else {
            res.json({ msg: "done" })
        }
    })
  */
  try {
    await Movies.findOneAndDelete({ _id: req.params._id });
    // pop from Users Array
    req.user.favourites = req.user.favourites.filter(
      (movie) => movie.toString() !== req.params._id
    );

    req.user.save((err) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ msg: "done" });
      }
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
