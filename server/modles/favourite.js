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
    }
})


module.exports = mongoose.model('Movies', favMovieSchema)