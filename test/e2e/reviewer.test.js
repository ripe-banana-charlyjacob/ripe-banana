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

});