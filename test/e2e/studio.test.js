const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Studios', () => {

    let studioOne = {
        name: 'Studio One',
        address: {
            city: 'New Orleans',
            state: 'LA',
            country: 'USA'
        }
    };

    let studioTwo = {
        name: 'Studio Two',
        address: {
            city: 'Atlanta',
            state: 'GA',
            country: 'USA'
        }
    };

    before(() => dropCollection('studios'));
    before(() => dropCollection('films'));

    it('post studio', () => {
        return request.post('/ripe-banana/studios')
            .send(studioOne)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...studioOne,
                    _id, __v
                });
                studioOne = body;
            });
    });

    const getFields = ({ _id, name }) => ({ _id, name });
    
    it('gets a studio by id', () => {
        return request.post('/ripe-banana/studios')
            .send(studioTwo)
            .then(({ body }) => {
                studioTwo = body;
                return request.get('/ripe-banana/studios');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [studioOne, studioTwo].map(getFields));
            });
    });
    
    it('get a studio by id', () => {
        let pan = {
            title: 'Pan',
            studio: studioOne._id,
            released: 2000,
            cast: []
        };

        return request.post('/films')
            .send(pan)
            .then(({ body }) => {
                pan = body;
                return request.get(`studios/${studioOne._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, {
                    ...studioOne,
                    films: [{
                        _id: pan._id,
                        title: pan.title
                    }]
                });
            });
    });
    
    it('deletes a studio', () => {
        return request.delete(`/ripe-banana/studios/${studioOne._id}`)
            .then(() => {
                return request.get(`/ripe-banana/studios/${studioOne._id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('returns 404', () => {
        return request.get(`/ripe-banana/studios/${studioOne._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, new RegExp(studioOne._id));
            });
    });
    
});