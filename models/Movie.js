const { Schema, model } = require('mongoose')

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
  tmdId: Number,
  overview: String,
  poster_path: String,
  popularity: Number,
  budget: Number
})

// Faster title search.
Movie.index({ title: 1 }, { collation: { locale: 'en_US', strength: 1 } })
// Even faster search when year provided.
Movie.index({ title: 1, year: -1 }, { collation: { locale: 'en_US', strength: 1 } })
// Faster tmdId search.
Movie.index({ tmdId: 1 }, { unique: false })

module.exports = model('Movie', Movie)
