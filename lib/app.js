const express = require('express');
const app = express();
const errorHandler = require('./util/error-handler');
const actors = require('./routes/actors');
const studios = require('./routes/studios');
const films = require('./routes/films');

app.use(express.json());

app.use('/ripe-banana', actors);
app.use('/ripe-banana', studios);
app.use('/ripe-banana', films);

app.use(errorHandler());

module.exports = app;