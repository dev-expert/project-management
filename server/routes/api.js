var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var projectRouter = require('./projects');
var task =  require('./task');

router.use('/users', userRouter);
router.use('/project', projectRouter);
router.use('/task', task);


module.exports = router;
