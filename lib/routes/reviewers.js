const router = require('express').Router();
const Reviewer = require('../models/Reviewer');

// const check404 = (reviewer, id) => {
//     if(!reviewer) {
//         throw {
//             status: 404,
//             error: `Reviewer with id ${id} does not exist`
//         };
//     }
// };

module.exports = router
    .post('/', (req, res, next) => {
        Reviewer.create(req.body)
            .then(reviewer => res.json(reviewer))
            .catch(next);
    });