const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        required: true
    },
    review: {
        type: String,
        max: 140,
        required: true
    },
    film: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Review', schema);