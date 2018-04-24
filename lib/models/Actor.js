const mongoose = require('mongoose'); // in org
const { Schema } = mongoose;
const Film = require('./Film');

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
        return Promise.all([
            this.findById(id)
                .lean()
                .select('name dob pob'),
            Film.find({ 'cast.actor': id })
                .lean()
                .select('title released')
        ])
            .then(([film, cast]) => {
                if(!film) return null;
                film.cast = cast;
                return film;
            });
    },

    getByQuery(query) {
        return this.find(query)
            .lean()
            .select('name dob pob');
    },

    removeById(id) {
        return Film.exists({ film: id })
            .then(exists => {
                if(exists) throw {
                    status: 400,
                    error: 'Cannot delete actors with listed films'
                };
                return this.findByIdAndRemove(id);
            });
    }


};

module.exports = mongoose.model('Actor', schema);