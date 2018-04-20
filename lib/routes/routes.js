const router = require('express').Router();
const Actor = require('../models/Actor');
const Film = require('../models/Film');
// const Review = require('../models/Review');
// const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');

const check404 = (actor, id) => {
    if(!actor) {
        throw {
            status: 404,
            error: `Actor with id: ${id} does not exist`
        };
    }
};

module.exports = router
    .post('/actors', (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    })

    .post('/films', (req, res, next) => {
        // const { id } = req.params;

        Film.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    })

    .post('/studios', (req, res, next) => {
        Studio.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    })

    .get('/actors', (req, res, next) => {
        Actor.find(req.query)
            .lean()
            .then(actors => res.json(actors))
            .catch(next);
    })

    .get('/films', (req, res, next) => {
        Film.find(req.query)
            .lean()
            .then(films => res.json(films))
            .catch(next);
    })

    .get('/studios', (req, res, next) => {
        Studio.find(req.query)
            .lean()
            .then(studios => res.json(studios))
            .catch(next);
    })

    .get('/actors/:id', (req, res, next) => {
        const { id } = req.params;

        Actor.findById(id)
            .lean()
            .then(actor => {
                check404(actor, id);
                res.json(actor);
            })
            .catch(next);
    })

    .get('/films/:id', (req, res, next) => {
        const { id } = req.params;

        Film.findById(id)
            .lean()
            .then(film => {
                check404(film, id);
                res.json(film);
            })
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