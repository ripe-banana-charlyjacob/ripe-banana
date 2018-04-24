const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { Types } = require('mongoose');

describe('Actors API', () => {
    before(() => dropCollection('actors'));
    before(() => dropCollection('films'));

    let helen = {
        name: 'Helen Mirren',
        dob: '07.26.1947',
        pob: 'London, England'
    };

    let bruce = {
        name: 'Bruce Willis',
        dob: '03.19.1955',
        pob: 'West Germany'
    };
    let film = {
        title: 'Isle of Dogs',
        studio: Types.ObjectId(),
        released: 2018,
        cast: []
    };

    before(() => {
        return request.post('/ripe-banana/actors')
            .send(helen)
            .then(({ body }) => {
                helen = body;
            });
    });

    before(() => {
        return request.post('/ripe-banana/films')
            .send(film)
            .then(({ body }) => {
                film = body;
            });
    });

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    it('saves an actor', () => {
        return request.post('/ripe-banana/actors')
            .send(helen)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...helen
                });
                helen = body;
            });
    });
    film.cast = [{ role: 'none', actor: helen._id }];
});
