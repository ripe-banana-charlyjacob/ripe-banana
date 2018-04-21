const { assert } = require('chai');
const Actor = require('../../lib/models/Actor');
const { getErrors } = require('./helpers');

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

    it('requires fields', () => {
        const actor = new Actor({});
        const errors = getErrors(actor.validateSync(), 1);
        assert.equal(errors.name.kind, 'required');
    });
});