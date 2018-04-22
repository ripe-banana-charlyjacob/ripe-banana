const { assert } = require('chai');
const Film = require('../../lib/models/Film');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose');

describe('Film Model', () => {
    
    it('Is a valid model', () => {
        const data = {
            title: 'Isle of Dogs',
            studio: Types.ObjectId(),
            released: 2018,
            cast: [{ part: 'Boss', actor: Types.ObjectId() }]
        };
        
        const dogs = new Film(data);
        
        data._id = dogs._id;
        data.cast[0]._id = dogs.cast[0]._id;
        assert.deepEqual(dogs.toJSON(), data);
        assert.isUndefined(dogs.validateSync());
    });

    it('requires fields', () => {
        const film = new Film({});
        const errors = getErrors(film.validateSync(), 3);
        assert.equal(errors.released.kind, 'required');
        assert.equal(errors.studio.kind, 'required');
        assert.equal(errors.title.kind, 'required');
    });
});