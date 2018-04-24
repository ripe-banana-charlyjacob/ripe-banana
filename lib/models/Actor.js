const mongoose = require('mongoose'); // in org
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    pob: {
        type: String
    }
});

schema.statics = {
    getActorDetail(id) {
        return this.findById(id)
            .lean()
            .select('name dob pob')
            .populate({
                path: 'films',
                select: ('title released')
            });
    },

    getByQuery(query) {
        return this.find(query)
            .lean()
            .select('name dob pob')
            .populate({
                path: 'films',
                select: ('title released')
            });
    },

    
}

module.exports = mongoose.model('Actor', schema);