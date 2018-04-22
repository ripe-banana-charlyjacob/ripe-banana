const { assert } = require('chai');
const Reviewer = require('../../lib/models/Reviewer');
const { getErrors } = require('./helpers');

describe('Reviewer Model', () => {
    it('Is a valid model', () => {
        
        const data = {
            name: 'Gassley',
            company: 'Pup Town'
        };

        const reviewer = new Reviewer(data);

        data._id = reviewer._id;
        assert.deepEqual(reviewer.toJSON(), data);
    });

    it('requires fields', () => {
        const reviewer = new Reviewer({});
        const errors = getErrors(reviewer.validateSync(), 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.company.kind, 'required');
    });
});