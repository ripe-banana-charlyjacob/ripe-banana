const router = require('express').Router(); // in org
const Actor = require('../models/Actor');
const { getParam, respond } = require('./route-reusables');

module.exports = router

    .param('id', getParam)

    .post('/', respond (
        ({ body }) => Actor.create(body)
    ))

    .put('/', respond(
        ({ id, body }) => Actor.updateById(id, body)
    ))

    .get('/:id', respond( 
        ({ id }) => Actor.getActorDetail(id)
    ))

    .get('/', respond(
        ({ query }) => Actor.getByQuery(query)
    ))

    .delete('/:id', respond(
        ({ id }) => Actor.findByIdAndRemove(id)
    ));

