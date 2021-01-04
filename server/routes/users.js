var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')
const UserModel = require('../models').User;
const userDetailsModel = require('../models').UserDetails;
const createUsers = async (payload, filter = null, updateMany = false) => {
  try {
    let result = null;
    if (filter !== null) {

      if (updateMany) {

        result = await UserModel.updateMany(filter, payload);
      } else {
         result = await UserModel.update({
          email: payload.email,
          password: payload.password,
          role: payload.role,
          firstName: payload.firstName,
          lastName: payload.lastName,
        }, { where: filter });
    
      }
    } else {
      

      payload.active = true;

       result = await UserModel.create(payload);
     
    }
    return result;
  } catch (err) {
    throw err;
  }
}

router.get('/', UserController.findAll);
router.post(  '/', async (req, res, next) => {
    try {
      const email = req.user.email;
      const user = req.body;
      // user.createdBy = email;
      const result = await createUsers(user);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.get('/:id', UserController.findOne);
router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const result = await createUsers(updatedUser, { id: id });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(  '/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await UserModel.update({
        active: false,
      }, { where: { id: id } });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
