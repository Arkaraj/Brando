const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    wishlist: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("WishList", WishListSchema);
