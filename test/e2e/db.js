require('dotenv').config({ MONGODB_URI: './test/e2e/.env' });
const connect = require('../../lib/connect');
const mongoose = require('mongoose');

before(() => connect.process.env.MONGODB_URI || 'mongobd://localhost:27017/ripe-banana_test');
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};