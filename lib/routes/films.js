const router = require('express').Router();
const Film = require('../models/Film');

const check404 = (actor, id) => {
    if(!actor) {
        throw {
            status: 404,
            error: `Actor with id: ${id} does not exist`
        };
    }
};

module.exports = router

    .post('/films', (req, res, next) => {
        // const { id } = req.params;

        Film.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    })

    .get('/films', (req, res, next) => {
        Film.find(req.query)
            .lean()
            .then(films => res.json(films))
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
    });