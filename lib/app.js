const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');
const app = express();
const errorHandler = require('./util/error-handler');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const studios = require('./routes/studios');
const actors = require('./routes/actors');
// const reviews = require('./routes/reviews');
// const reviewers = require('./routes/reviewers');
const films = require('./routes/films');

app.use('/ripe-banana/studios', studios);
app.use('/ripe-banana/actors', actors);
// app.use('/ripe-banana/reviews', reviews);
// app.use('/ripe-banana/reviewers', reviewers);
app.use('/ripe-banana/films', films);

app.use((req, res) => {
    res.sendFile('index.html', {
        root: resolve(__dirname + '/../public/')
    });
});

app.use(errorHandler());

module.exports = app;