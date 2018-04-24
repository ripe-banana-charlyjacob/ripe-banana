const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { Types } = require('mongoose');
const Actor = require('../../lib/models/Actor');

describe.only('Actors API', () => {
    before(() => dropCollection('actors'));
    before(() => dropCollection('films'));

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));
    const getFields = ({ _id, name }) => ({ _id, name });

    let helen = {
        name: 'Helen Mirren',
        dob: new Date(1947, 7, 26).toJSON(),
        pob: 'London, England'
    };

    let bruce = {
        name: 'Bruce Willis',
        dob: new Date(1955, 3, 19).toJSON(),
        pob: 'West Germany'
    };

    // before(() => {
    //     return request.post('/ripe-banana/films')
    //         .send(film)
    //         .then(({ body }) => {
    //             film = body;
    //         });
    // });

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
                    ...helen,
                    _id, __v,
                });
                helen = body;
            });
    });

    it('get all actors', () => {
        return Actor.create(bruce).then(roundTrip)
            .then(saved => {
                bruce = saved;
                return request.get('/ripe-banana/actors');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [helen, bruce].map(getFields));
            });
    });
    
    it('gets an actor and their films by id', () => {
        let film = {
            title: 'Isle of Dogs',
            studio: Types.ObjectId(),
            released: 2018,
            cast: [{
                part: 'none',
                actor: bruce._id
            }]
        };
        return request.post('/ripe-banana/films')
            .send(film)
            .then(({ body }) => {
                film = body;
            })
            .then(() => {
                return request.get(`/ripe-banana/actors/${bruce._id}`);
            })
            .then(({ body }) => {
                console.log('********** end body: ', body);
                assert.deepEqual(body.films[0].title, film.title);
            });
    });

});
