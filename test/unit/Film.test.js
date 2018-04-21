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
            cast: [{
                actor: Types.ObjectId(),
                part: 'Boss'
            }]
        };
        const dogs = new Film();
        
        data._id = dogs._id;
        console.log(data.cast[0]);
        // data.cast[0].actor = dogs.cast[0].actor;
        assert.deepEqual(dogs.toJSON(), data);
        assert.isUndefined(dogs.validateSync());
    });
});