const mongoose = require('mongoose');

const favMovieSchema = mongoose.Schema({
    id: {
        type: Number,
        default: 0,
        required: true
    },
    fav: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Movies', favMovieSchema)