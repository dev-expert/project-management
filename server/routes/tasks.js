var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/task')
var protectRoute = require('../auth/protect-route');

/* GET task listing. */
router.get('/', protectRoute('read', 'tasks'), TaskController.findAll);
router.get('/inprogress', protectRoute('read', 'tasks'), TaskController.findInProgress);
router.get('/:id', protectRoute('read', 'tasks'), TaskController.findOne);
router.post('/', protectRoute('write', 'tasks'), TaskController.create);
router.put('/:id', protectRoute('update', 'tasks'), TaskController.update);
router.delete('/:id', protectRoute('delete', 'tasks'), TaskController.delete);

module.exports = router;
