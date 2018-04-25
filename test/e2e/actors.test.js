const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
// const Actor = require('../../lib/models/Actor');
// const { Types } = require('mongoose');

describe('Actor API', () => {
    
    before (() => dropCollection('actors'));

    let jermaine = {
        name: 'Jermaine Clement',
        dob: new Date(1999, 9, 9).toJSON(),
        pob: 'Auckland, NZ'
    };

    // let bret = {
    //     name: 'Bret Mackenzie',
    //     dob: new Date(1888, 8, 8).toJSON(),
    //     pob: 'Nelson, NZ'
    // };

    // const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));
    // const getFields = ({ _id, name }) => ({ _id, name });

    it('saves an actor', () => {
        return request.post('/ripe-banana/actors')
            .send(jermaine)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...jermaine,
                    _id,
                    __v
                });
                jermaine = body;
            });
    });

});
