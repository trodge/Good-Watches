const { Schema, model } = require('mongoose');

const Movie = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    serial: Boolean,
    tmdId: {
        type: Number,
        unique: false
    }
});

// No duplicate movies according to year and title.
Movie.index({ title: 1, year: -1 }, { unique: true });
// Faster title search.
Movie.index({ title: 1 });
// Faster tmdId search.
Movie.index({ tmdId: 1 }, { unique: false });

module.exports = model('Movie', Movie);
