const { Movie } = require('../models');

const request = require('supertest'),
    server = require('../server'),
    assert = require('assert');

const mongoose = require('mongoose');

before(function () {
    mongoose.connect('mongodb://localhost/test');
});

describe('Title Search', function () {
    it('finds movies by title', function (done) {
        request(server)
            .get('/api/movies/search/47')
            .then(function (err, res) {
                console.error(err);
                console.log('response body:', res.body);
                assert(Array.isArray(res.body));
                done();
            });
    });
    after(function () {
        server.close();
        process.exit();
    })
});

describe('Save movie', function () {
    it('Favorites some movie', function (done) {
        request(server)
            .put('/api/user/favorite')
            .send({ tmdId: /*TODO: FIND TMDID*/ null })
            .expect(200)
            .then(done());
    })
});