const router = require('express').Router();
const Film = require('../models/Film');
const check404 = require('./check-404');
const { updateOptions } = require('../util/mongoose-helpers');
const Review = require('../models/Review');

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
                .lean()
                .select('title studio released cast')
                .populate({
                    path: 'studio',
                    select: 'name'
                })
                .populate({
                    path: 'cast.actor',
                    select: 'name'
                }),
            Review.find({ film: id })
                .lean()
                .select('rating review reviewer')
                .populate({
                    path: 'reviewer',
                    select: 'name'
                })
        ])
            .then(([film, reviews]) => {
                check404(film, id);
                film.reviews = reviews;
                res.json(film);
            })
            .catch(next);

    })

    .get('/', (req, res, next) => {
        Film.find(req.query)
            .lean()
            .select('title studio released')
            .populate({
                path: 'studio',
                select: 'name'
            })
            .then(films => res.json(films))
            .catch(next);
    });