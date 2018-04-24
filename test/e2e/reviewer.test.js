const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Reviewers', () => {

    before(() => dropCollection('reviewers'));

    let armond = {
        name: 'Armond White',
        company: 'Independant'
    };

    let eli = {
        name: 'Eli Lake',
        company: 'Bloomberg'
    };

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    it('post reviewer', () => {
        return request.post('/ripe-banana/reviewers')
            .send(armond)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...armond,
                    _id, __v
                });
                armond = body;
            });
    });

    it('gets a reviewer by id', () => {
        return request.post('/ripe-banana/reviewers')
            .send(eli)
            .then(checkOk)
            .then(({ body }) => {
                eli = body;
                return request.get(`/ripe-banana/reviewers/${eli._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, eli);
            });
    });
        
    it('update a reviewer', () => {
        armond.company = 'sony';
        
        return request.put(`/ripe-banana/reviewers/${armond._id}`)
            .send(armond)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, armond);
                return request.get(`/ripe-banana/reviewers/${armond._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, armond);
            });
    });

    const getFields = ({ _id, name }) => ({ _id, name });
    
    it('gets all reviewers _id and name', () => {
        return request.get('/ripe-banana/reviewers')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [armond, eli].map(getFields));
            });
    });
    
    it('deletes a reviewer', () => {
        return request.delete(`/ripe-banana/reviewers/${armond._id}`)
            .then(() => {
                return request.get(`/ripe-banana/reviewers/${armond._id}`);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('returns 404', () => {
        return request.get(`/ripe-banana/reviewers/${armond._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, new RegExp(armond._id));
            });
    });
    
});