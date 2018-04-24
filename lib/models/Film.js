const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Actor = require('./Actor');
// const Studio = require('./Studio');
// const Review = require('./Review');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'studio',
        required: true
    },
    released: {
        type: Number,
        min: 1895,
        max: 2019,
        required: true
    },
    cast: [{
        part: {
            type: String,
        },
        actor: {
            type: Schema.Types.ObjectId,
            ref: 'actors',
            required: true
        }
    }]
});

module.exports = mongoose.model('Film', schema);