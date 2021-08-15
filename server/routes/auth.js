const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportConfig = require("./passport");
const movies = require("./movies");
const tvshows = require("./tvshows");
const Shows = require("../models/Shows");

// For movies
router.use("/movies", passport.authenticate("jwt", { session: false }), movies);

// For tvs
router.use("/tv", passport.authenticate("jwt", { session: false }), tvshows);

const signToken = (id) => {
  return JWT.sign(
    {
      iss: "Arkaraj", // issued by
      sub: id,
    },
    `${process.env.SECRET}`,
    { expiresIn: "31d" }
  );
};

// Gets all Users
router.get("/", async (req, res) => {
  const user = await Users.find().lean();
  try {
    res.status(200).json(user);
  } catch (err) {
    //console.log('Error ' + err)
    res.status(500).json({ msg: "Error has occured" });
  }
});

// Delete User
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: { msg: "User Deleted", msgError: false } });
    } catch (err) {
      res
        .status(500)
        .json({ message: { msg: "Invalid User Id", msgError: true } });
    }
  }
);

// Logout Account
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ msg: "Logged out", user: {}, success: true });
  }
);

// Get deatails of specific User
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).lean();
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(400)
          .json({ message: { msg: "Invalid User Id", msgError: true } });
      }
    } catch (err) {
      //console.log('Error ' + err)
      res
        .status(500)
        .json({ message: { msg: "Error has occured", msgError: true } });
    }
  }
);

// For registering User
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  Users.findOne({ email }, (err, emailPresent) => {
    if (err) {
      //console.log('Error ' + err)
      res
        .status(500)
        .json({ message: { msg: "Error has occured", msgError: true } });
    }
    if (emailPresent)
      res
        .status(400)
        .json({ message: { msg: "email is already taken", msgError: true } });
    else {
      const newUser = new Users({ username, password, email });

      newUser.save(async (err) => {
        if (err) {
          //console.log('Error ' + err)
          res
            .status(500)
            .json({
              message: {
                msg: "Error has occured",
                msgError: true,
                error: err.message,
              },
            });
        } else {
          const newShows = new Shows({
            user: newUser._id,
            favourites: [],
            wishlist: [],
          });
          await newShows.save();

          res.status(201).json({
            message: { msg: "Account successfully created", msgError: false },
          });
        }
      });
    }
  });
});

// Authorization through passport

// For Loginnig in User
// User should not be able to go back once authenticated
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email }, function (err, user) {
    if (err) {
      //console.log('Error ' + err)
      res
        .status(500)
        .json({ message: { msg: "Error has occured", msgError: true } });
    }
    if (!user) {
      res
        .status(400)
        .json({ message: { msg: "Invalid Email", msgError: true } });
    } else {
      bcrypt.compare(password, user.password, function (err, validate) {
        if (err) {
          //console.log('Error ' + err)
          res.status(500).json({
            message: { msg: "Error has occured in bcrypt", msgError: true },
          });
        }
        if (!validate) {
          res
            .status(400)
            .json({ message: { msg: "Invalid Password", msgError: true } });
        } else {
          // Logged in
          const token = signToken(user._id);
          // httpOnly doen't let client side js touch the cookie saves from cross scripting attacks
          res.cookie("access_token", token, { httpOnly: true, sameSite: true });
          res.status(200).json({
            user,
            isAuthenticated: true,
            message: { msgError: false },
          });
        }
      });
    }
  });
});

// For checking Authentication
router.get(
  "/c/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

// Rating
// Rating other users, id is _id of other users
router.put(
  "/rating/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { rating } = req.body;

    let user = await Users.findById(req.params.id);

    user.views += 1;
    const currRate = user.rating == 0 ? rating : (user.rating + rating) / 2;

    user.rating = currRate;

    try {
      user = await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.log("Error: " + err);
      res
        .status(500)
        .json({ message: { msg: "Error has occured", msgError: true } });
    }
  }
);

// Status

router.put("/status/:_id", (req, res) => {
  const { status } = req.body;

  Users.findById(req.params._id, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      user.status = status;
      user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Could not Update Status", msgError: true });
        } else {
          res.status(200).json(user);
        }
      });
    }
  });
});
router.put("/vote/:_id", (req, res) => {
  const { vote } = req.body;

  Users.findById(req.params._id, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      user.upvotes += vote;
      user.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Could not Update Status", msgError: true });
        } else {
          res.status(200).json(user);
        }
      });
    }
  });
});

module.exports = router;
