const router = require('express').Router();
const Studio = require('../models/Studio');
const check404 = require('./check-404');
const Film = require('../models/Film');

const check404 = (studio, id) => {
    if(!studio) {
        throw {
            status: 404,
            error: `Studio with id ${id} does not exist`
        };
    }
};

let updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .post('/', (req, res, next) => {
        Studio.create(req.body)
            .then(studio => res.json(studio))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Promise.all([
            Studio.findById(id)
                .lean(),

            Film.find({ studio: id })
                .lean()
                .select('title')
        ])
            .then(([studio, films]) => {
                check404(studio, id);
                studio.films = films;
                res.json(studio);
            })
            .catch(next);
    })


    .put('/:id', (req, res, next) => {
        Studio.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(studio => res.json(studio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio.find(req.query)
            .lean()
            .sort({ createdAt: -1 })
            .limit(100)
            .select('name createdAt updatedAt')
            .then(studio => res.json(studio))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        const { id } = req.params;

        Film.find({ studio: id })
            .count()
            .then(count => {
                if(count) throw {
                    status: 400,
                    error: 'cannot delete studio with films'
                };
                return Studio.findByIdAndRemove(id);
            })
            .then(removed => res.json({ removed }))
            .catch(next);
    });
