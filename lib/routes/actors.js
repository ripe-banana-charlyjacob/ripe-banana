const router = require('express').Router(); // in org
const Actor = require('../models/Actor');

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

    .get('/actors', (req, res, next) => {
        Actor.find(req.query)
            .lean()
            .then(actors => res.json(actors))
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
    });