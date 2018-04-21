const { assert } = require('chai');
const Actor = require('../../lib/models/Actor');

describe('Actor Model', () => {
    
    it('Is a valid model', () => {
        const data = {
            name: 'Helen Mirren',
            dob: '07.26.1947',
            pob: 'London, England'
        };

        const helen = new Actor(data);
        data._id = helen._id;
        data.dob = helen.dob;
        assert.deepEqual(helen.toJSON(), data);
    });
});