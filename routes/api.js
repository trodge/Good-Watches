const router = require('express').Router();
const { User, Movie } = require('../models');
const { Types } = require('mongoose');
const axios = require('axios');

// Get a specific user by _id or all users if none specified.
router.get('/user/:_id?', (req, res) => {
    console.log(req.path);
    const { _id } = req.params;
    if (!_id) {
        res.sendStatus(400);
        return;
    }
    const promise = _id ? User.findById(Types.ObjectId(_id)) : User.find();
    promise.then(result => res.send(result)).catch(err => res.send(err));
});


// Delete a user by _id.
router.delete('/user', (req, res) => {
    if (!req.user) {
        res.sendStatus(530);
        return;
    }
    const { _id } = req.user;
    if (!_id) res.sendStatus(400);
    // Delete the user.
    User.findByIdAndDelete(Types.ObjectId(_id))
        .then(result => res.send(result))
        .catch(err => res.send(err));

});

// Get titles starting with given search string (case sensitive)
router.get('/movies/search/:title', (req, res) => {
    console.log(req.path, 'Start:', new Date().getMilliseconds());
    const regex = new RegExp('^' + req.params.title);
    console.log(regex);
    Movie.find({ title: regex },
        (err, result) => {
            console.error(err);
            console.log('result:', result);
            res.send(result);
        });
    console.log(req.path, 'End:', new Date().getMilliseconds());
});

// Given a relative url and params from the page, return the url for TMD.
const createMovieDbUrl = ({ relativeUrl, params }) => {
    let url = `https://api.themoviedb.org/3${relativeUrl}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`;
    if (params)
        for (let item in params)
            // Concatenate params' values to url.
            url += `&${item}=${params[item]}`;
    console.log('createMovieDbUrl:', relativeUrl, params, url);
    return url;
};

// Get movies returned by given query to TMD.
router.put('/movies', (req, res) => {
    console.log(req.path, req.body);
    const { query } = req.body;
    // Create a promise out of the req.body.
    axios.get(createMovieDbUrl(query)).then(result => {
        if (query) {
            // Query contained data for TMD.
            const { data } = result;
            if (!query.params) {
                // Query is for a single movie.
                console.log('Not storing this data... yet', data);
                res.send(data);
                return;
            }
            const queries = data.results.map(result =>
                new Promise((resolve, reject) => {
                    Movie.updateOne({
                        // Find title case-insensitively.
                        title: new RegExp(result.title, 'i'),
                        year: parseInt(result.release_date.slice(0, 4)),
                        serial: false
                    }, {
                        $set: {
                            // Set title to match TMD.
                            title: result.title,
                            tmdId: result.id
                        }
                    }, {
                        // Insert movie if not found.
                        upsert: true
                    }, (err, raw) => {
                        if (err) reject(err);
                        resolve(raw);
                    });
                })
            );
            res.send(data);
            console.log('Response sent, processing queries...');
            Promise.all(queries).then(console.log)
                .catch(console.error);
        }
    }).catch(err => res.send(err));
});

// same as above, but for TV
router.put('/tv', (req, res) => {
    console.log(req.path, req.body);
    const { query } = req.body;
    // Create a promise out of the req.body.
    axios.get(createMovieDbUrl(query)).then(result => {
        if (query) {
            // Query contained data for TMD.
            const { data } = result;
            if (!query.params) {
                // Query is for a single tv show.
                console.log('Not storing this data... yet', data);
                res.send(data);
                return;
            }
            const queries = data.results.map(result =>
                new Promise((resolve, reject) => {
                    Movie.updateOne({
                        // Find title case-insensitively.
                        title: new RegExp(result.title, 'i'),
                        year: parseInt(result.first_air_date.slice(0, 4)),
                        serial: true
                    }, {
                        $set: {
                            // Set title to match TMD.
                            title: result.title,
                            tmdId: result.id
                        }
                    }, {
                        // Insert tv if not found.
                        upsert: true
                    }, (err, raw) => {
                        if (err) reject(err);
                        resolve(raw);
                    });
                })
            );
            res.send(data);
            console.log('Response sent, processing queries...');
            Promise.all(queries).then(console.log)
                .catch(console.error);
        }
    }).catch(err => res.send(err));
});



// Favorite a movie.
router.put('/user/favorite', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(530);
        return;
    }
    console.log(req.path, req.body);
    const dbMovie = await Movie.findOne({ tmdId: req.body.tmdId });
    User.updateOne({ _id: req.user._id }).then(
        { $push: { saves: dbMovie } }, dbUser => {
            console.log('dbUser:', dbUser);
            res.sendStatus(200);
        });
});

// Favorite a movie.
router.put('/user/favorite', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(530);
        return;
    }
    console.log(req.path, req.body);
    const dbMovie = await Movie.findOne({ tmdId: req.body.tmdId });
    User.updateOne({ _id: req.user._id }).then(
        { $push: { saves: dbMovie } }, dbUser => {
            console.log('dbUser:', dbUser);
            res.sendStatus(200);
        });
});

// Favorite a movie.
router.put('/user/favorite', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(530);
        return;
    }
    console.log(req.path, req.body);
    const dbMovie = await Movie.findOne({ tmdId: req.body.tmdId });
    User.updateOne({ _id: req.user._id }).then(
        { $push: { saves: dbMovie } }, dbUser => {
            console.log('dbUser:', dbUser);
            res.sendStatus(200);
        });
});

/* Given an array of movie ids and a user _id as strings,
 * return movies the user hasn't saved, rated, or rejected. */
const unseen = (_id, movies) => {
    movies = movies.map(movie => Types.ObjectId(movie));
    User.findById(Types.ObjectId(_id), user =>
        movies.filter(movie => {
            for (let item of ['ratings', 'rejects', 'saves'])
                if (user[item].includes(movie))
                    return false;
            return true;
        }));
};


// Get recommendations on a given movie id.
router.get('/recommendations/:_id', (req, res) => {
    if (!req.params._id) {
        res.sendStatus(400);
        return;
    }
    // Find the movie in the database.
    Movie.findById(Types.ObjectId(req.params._id)).then(movie =>
        axios.get(createMovieDbUrl({ relativeUrl: `/movie/${movie.tmdId}/recommendations` }))
            .then(tmdMovies => {
                // Find movies in database matching tmdIds of recommendations.
                Movie.find({ tmdId: { $in: tmdMovies.map(tmdMovie => tmdMovie.id) } },
                    (err, movies) => {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        if (req.isAuthenticated())
                            // Send movies the user hasn't seen yet.
                            res.send(unseen(req.user._id, movies));
                        else
                            // Send all the movies.
                            res.send(movies);
                        if (movies.length < tmdMovies.length) {
                            // Find movies that are not in db.
                            const missingMovies = tmdMovies.filter(tmdMovie =>
                                !movies.find(e => e.tmdId === tmdMovie.id));
                            // Insert those movies into the db with titles and years.
                            Movie.insertMany(missingMovies.map(tmdMovie => ({
                                title: tmdMovie.title,
                                year: parseInt(result.release_date.slice(0, 4))
                            })),
                                (error, docs) => {
                                    if (error) console.log('Insert error:', error);
                                    else console.log('Movies inserted:', docs);
                                });
                        }
                    });
            }));

});


module.exports = router;