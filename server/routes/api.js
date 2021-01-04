var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var projectsRouter = require('./projects');
var tasksRouter =  require('./tasks');
var commentRouter =  require('./comments');
var roleRouter =  require('./roles');

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);
router.use('/comments', commentRouter);
router.use('/roles', roleRouter);


module.exports = router;
