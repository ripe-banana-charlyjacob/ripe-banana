const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Reviewers', () => {

    before(() => dropCollection('reviewers'));

    let armond = {
        name: 'Armond White',
        company: 'Independant'
    };

    // let eli = {
    //     name: 'Eli Lake',
    //     company: 'Bloomberg'
    // };

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
            });
    });

    it('gets a reviewer by id', () => {
        return request.post('/ripe-banana/reviewers')
            .send(armond)
            .then(checkOk)
            .then(({ body }) => {
                armond = body;
                return request.get(`/ripe-banana/reviewers/${armond._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, armond);
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

});