const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Studios', () => {

    before(() => dropCollection('studios'));

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

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    it('post studio', () => {
        return request.post('/ripe-banana/studios')
            .send(studioOne)
            .then(checkOk)
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

    it('gets a studio by id', () => {
        return request.post('/ripe-banana/studios')
            .send(studioTwo)
            .then(checkOk)
            .then(({ body }) => {
                studioTwo = body;
                return request.get(`/ripe-banana/studios/${studioTwo._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, studioTwo);
            });
    });
        
    it('update a studio', () => {
        studioOne.address.city = 'Roscoe';
        
        return request.put(`/ripe-banana/studios/${studioOne._id}`)
            .send(studioOne)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, studioOne);
                return request.get(`/ripe-banana/studios/${studioOne._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, studioOne);
            });
    });

    const getFields = ({ _id, name }) => ({ _id, name });
    
    it('gets all studios _id and name', () => {
        return request.get('/ripe-banana/studios')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [studioOne, studioTwo].map(getFields));
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