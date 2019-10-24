const path = require('path');
const express = require('express');

const router = require('./routes');

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/watches';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGODB_URI, (err) => {
    if (err) throw err;
});

const app = express();

app.use('/', router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Listening on ' + PORT));

module.exports = app;
