const mongoose = require("mongoose");

const TvSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  favourites: [Number],
  wishlist: [Number],
});

// TvSchema.pre("save", function (next) {
//     next();
// });

module.exports = mongoose.model("Shows", TvSchema);
