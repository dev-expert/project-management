var express = require('express');
var router = express.Router();
var RoleController = require('../controllers/roles')
var protectRoute = require('../auth/protect-route');

/* GET Role listing. */
router.get('/', RoleController.findAll);

module.exports = router;
