const { assert } = require('chai');
const Studio = require('../../lib/models/Studio');
const { getErrors } = require('./helpers');

describe('Studio Model', () => {

    it('Is a valid model', () => {
        const data = {
            name: 'Vision8 Studio',
            address: {
                city: 'Portland',
                state: 'OR',
                country: 'United'
            }
        };

        const vision8 = new Studio(data);
        data._id = vision8._id;
        assert.deepEqual(vision8.toJSON(), data);
    });
});