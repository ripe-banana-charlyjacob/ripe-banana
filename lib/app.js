const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const routes = require('./routes/routes');

app.use(express.json());

app.use('/ripe-banana', routes);

app.use(errorHandler());

module.exports = app;