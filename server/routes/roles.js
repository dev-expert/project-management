var express = require('express');
var router = express.Router();
var RoleController = require('../controllers/roles')

/* GET Role listing. */
router.get('/', RoleController.findAll);

module.exports = router;
