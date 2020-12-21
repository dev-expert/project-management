var debug = require('debug')('simpleserver:app');
var express = require('express');
var dottenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var cors = require('cors');
dottenv.config();
const { mongoUri } = require('./env');
mongoose.connect(mongoUri, {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
}, (err) => {
    if(err) {
        debug('MongoDB Connection failed', err)
    } else {
        debug('MongoDB Connected Sucessfully')
    }
})
require('./auth/auth');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRouter);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
