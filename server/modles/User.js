const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 12
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "Casual Movie Watcher 🎬"
    },
    views: {
        type: Number,
        default: 0,
        min: 0
    },
    upvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
    // Wishlist types can also be made
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });

});

module.exports = mongoose.model('User', UserSchema)