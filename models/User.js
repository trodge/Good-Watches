const { Schema, model } = require('mongoose')

const MovieRef = {
  type: Schema.Types.ObjectId,
  ref: 'Movie'
}

const User = new Schema({
  authId: {
    type: String,
    required: true
  },
  authProvider: {
    type: String,
    required: true
  },
  ratings: [{
    movie: MovieRef,
    rating: Number
  }],
  rejects: [{
    movie: MovieRef
  }],
  saves: [{
    movie: MovieRef
  }]
})

module.exports = model('User', User)
