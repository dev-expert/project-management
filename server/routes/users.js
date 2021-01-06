var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users');
router.get('/', UserController.findAll);
router.post('/', UserController.create);
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
module.exports = router;
