const mongoose = require('mongoose');

const favMovieSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
        required: true
        // unique: true remove this
    },
    fav: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: false,
        default: 0
    }
})


module.exports = mongoose.model('Movies', favMovieSchema)