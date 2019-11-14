// dotenv is used to keep variable Secret (even Locally)
require("dotenv").config();

// npm package loading
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

// npm passport configuration information
require('./config/passport-init');

// express routes
const router = require('./routes');

// loads the MongoDB URI; Sets Default Parms; Attempts connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/watches';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI, err => {
    if (err) throw err;
});
console.log('Mongoose connected');

// Port Value for Express Application
const PORT = process.env.PORT || 8080;

// loads express into app
const app = express();

// configures express app for urlEncoded and Json support
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if the NODE_ENV is production (HEROKU Default) then static load the client/build path
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// gets Cookie-Session and Cookie-Parser Loaded and configured
var expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 Day
app.use(cookieSession({
  name: 'session',
  keys: [process.env.sessionKey1, process.env.sessionKey1],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'good-watches.herokuapp.com',
    expires: expiryDate
  },
  maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser(process.env.sessionKey1));

// inititialze Passport into express app.use and set configuration
app.use(passport.initialize());
app.use(passport.session());

// initialize routes into express app.use
app.use(router);

// start app listening on Port
const server = app.listen(PORT, () => console.log('Listening on ' + PORT));

module.exports = {
    server: server,
    app: app
};
