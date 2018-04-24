const router = require('express').Router(); // in org
const Actor = require('../models/Actor');
const check404 = require('./check-404');

module.exports = router
    .post('/', (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor.find(req.query)
            .lean()
            .then(actors => res.json(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Actor.findById(id)
            .lean()
            .then(actor => {
                check404(actor, id);
                res.json(actor);
            })
            .catch(next);
    });