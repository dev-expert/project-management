var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var projectRouter = require('./projects');

router.use('/users', userRouter);
router.use('/projects', projectRouter);

module.exports = router;
