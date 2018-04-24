const router = require('express').Router();
const Studio = require('../models/Studio');

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

        Studio.findById(id)
            .lean()
            .then(studio => {
                check404(studio, id);
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
        Studio.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(next);
    });