const router = require('express').Router();
const Film = require('../models/Film');
const check404 = require('./check-404');
const { updateOptions } = require('../util/mongoose-helpers');

module.exports = router

    .post('/', (req, res, next) => {
        Film.create(req.body)
            .then(film => res.json(film))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Film.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(film => res.json(film))
            .catch(next);
    })
    
    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Promise.all([
            Film.findById(id)
                .populate({
                    path: 'studio',
                    select: 'name'
                })
                .lean(),
            
            Film.find({ film: id })
                .lean()
                .select('name cast reviews')
        ])
        
        Film.findById(id)
            .lean()
            .then(film => {
                check404(film, id);
                res.json(film);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Film.find(req.query)
            .lean()
            .then(films => res.json(films))
            .catch(next);
    });