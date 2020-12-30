var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/task')
// const { body } = require('express-validator');

/* GET task listing. */
router.get('/', TaskController.findAll);
router.get('/:id',TaskController.findOne);
router.post('/',TaskController.create);
router.put('/:id',TaskController.update);
router.delete('/:id',TaskController.delete);

module.exports = router;
