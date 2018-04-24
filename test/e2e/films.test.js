// const { assert } = require('chai');
// const request = require('./request');
// const { dropCollection } = require('./db');
// const { Types } = require('mongoose');

describe.skip('Films API', () => {
    before(() => dropCollection('films'));
    before(() => dropCollection('studios'));
    before(() => dropCollection('actors'));


//     const checkOk = res => {
//         if(!res.ok) throw res.error;
//         return res;
//     };

//     let studio = {
//         name: 'BigMoney',
//         address: {
//             city: 'Portland',
//             state: 'OR',
//             country: 'USA'
//         }
//     };

//     before(() => {
//         return request.post('/studios')
//             .send(studio)
//             .then(({ body }) => {
//                 studio = body;
//                 // console.log(studio._id);
//             });
//     });

//     let film = {
//         title: 'Amelie',
//         studio: studio._id,
//         released: 2001,
//         cast: [{ part: 'Amelie', actor: Types.ObjectId() }]
//     };

//     // let film2 = {
//     //     title: 'Cats and Dogs',
//     //     studio: studio._id,
//     //     released: 2000,
//     //     cast: [{ part: 'bad guy', actor: Types.ObjectId() }]
});

//     it('saves a film', () => {
//         return request.post('/films')
//             .send(film)
//             .then(checkOk)
//             .then(({ body }) => {
//                 const { _id, __v } = body;
//                 assert.ok(_id);
//                 assert.equal(__v, 0);
//                 assert.deepEqual(body, {
//                     ...film,
//                     _id, __v
//                 });
//                 film = body;
//             });
//     });
// });