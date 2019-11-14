const router = require('express').Router();
const passport = require('passport');
require('../config/passport-init');

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send(true);
});

// auth logout
router.get('/authenticated', (req, res) => {
    if(req.isAuthenticated()){
        res.send(true);
    } else {
        res.send(false);
    }
});

// Express Route used to answer on /auth/google ---> Sends client to Google for Authentication
router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
);

// Express Route used to recieve the Auth google callback response
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',

    }),
    (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            res.send('No User');
        }
    }
);

// Express Route used to answer on /auth/twitter ---> Sends client to Twitter for Authentication
router.get('/twitter',
    passport.authenticate('twitter')
);

// Express Route used to recieve the Auth Twitter callback response
router.get('/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/',
    }),
    (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            res.send('No User');
        }
    }
);

module.exports = router; 