const { assert } = require('chai');
const Review = require('../../lib/models/Review');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose');

describe('Review Model', () => {

    it('is a valid model', () => {

        const data = {
            rating: 4,
            reviewer: Types.ObjectId(),
            review: 'Tight.',
            film: Types.ObjectId(),
            createdAt: '12.11.2009',
            updatedAt: '12.13.2009'
        };

        const rev = new Review(data);

        data._id = rev._id;
        data.createdAt = rev.createdAt;
        data.updatedAt = rev.updatedAt;
        assert.deepEqual(rev.toJSON(), data);
    });

    it('requires fields', () => {
        const rev = new Review({});
        const errors = getErrors(rev.validateSync(), 5);
        assert.equal(errors.rating.kind, 'required');
        assert.equal(errors.reviewer.kind, 'required');
        assert.equal(errors.review.kind, 'required');
        assert.equal(errors.film.kind, 'required');
        assert.equal(errors.updatedAt.kind, 'required');
        // no 'required' error for createdAt because it defaults to .now
    });

    const data = {
        rating: 0,
        reviewer: Types.ObjectId(),
        review: 'No.',
        film: Types.ObjectId(),
        createdAt: '12.11.2009',
        updatedAt: '12.13.2009'
    };

    
    it('has a min rating of 1', () => {
        const newRev = new Review(data);
        const errors = getErrors(newRev.validateSync());
        assert.equal(errors.rating.kind, 'min');
    });

    it('has a max rating of 5', () => {
        data.rating = 23;
        const newRev = new Review(data);
        const errors = getErrors(newRev.validateSync());
        assert.equal(errors.rating.kind, 'max');
    });

});