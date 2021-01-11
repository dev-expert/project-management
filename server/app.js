var debug = require('debug')('simpleserver:app');
var express = require('express');
var dottenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
dottenv.config();
var dbConn = require('./models');
var addAbility = require('./middlewares/auth/ability');
const pagination = require('./middlewares/filter/pagination');
const errorLogs = require('./controllers/errorLog');

//Connect Database

process.on("uncaughtException", (e) => {
	console.error('uncaughtException ===================>')
	console.error(e);
  });
  process.on("unhandledRejection", (e) => {
	console.error('unhandledRejection ===================>')
	console.error(e);
  });

dbConn.sequelize
  .authenticate()
  .then(() => {
    debug('DB Connection has been established successfully.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
  });

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
app.use('/api', passport.authenticate('jwt', { session: false }), addAbility ,pagination,apiRouter);
app.use(function(err, req, res, next) {
	console.error('ErronHandler ===================>')

    console.log(err);
    errorLogs.errorLogging(req,err);
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
