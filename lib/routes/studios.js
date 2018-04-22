const router = require('express').Router();
const Studio = require('../models/Studio');

const check404 = (studio, id) => {
    if(!studio) {
        throw {
            status: 404,
            error: `Studio with id: ${id} does not exist`
        };
    }
};

module.exports = router

    .post('/studios', (req, res, next) => {
        Studio.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    })

    .get('/studios', (req, res, next) => {
        Studio.find(req.query)
            .lean()
            .then(studios => res.json(studios))
            .catch(next);
    })

    .get('/studios/:id', (req, res, next) => {
        const { id } = req.params;

        Studio.findById(id)
            .lean()
            .then(studio => {
                check404(studio, id);
                res.json(studio);
            })
            .catch(next);
    });