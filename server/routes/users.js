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
        const user = await UserModel.update({
          email: payload.email,
          password: payload.password,
          role: payload.role,
        }, { where: filter });
        if (user) {
          result = await userDetailsModel.update({
            firstName: payload.firstName,
            lastName: payload.lastName,
          }, { where: { userId: filter.id } });
        }
      }
    } else {
      payload.active = true;

      const user = await UserModel.create(payload);
      if (user) {
        payload.userId = user.id
        result = await userDetailsModel.create(payload);
      }
    }
    return result;
  } catch (err) {
    throw err;
  }
}
const findUsers = async (filter = {}, onlyOne = false) => {
  try {
    let result = null;
    if (onlyOne) {

      result = await UserModel.findByPk(filter.id);
    } else {
      result = await UserModel.findAll({
        where: filter,
        include: [
          {
            model: userDetailsModel,
            as: "UserDetails"
          }
        ]
      });
    }
    return result;
  } catch (err) {
    throw err;
  }
}
router.get('/', UserController.findAll);
router.post(
  '/', async (req, res, next) => {
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
router.put(
  '/:id', async (req, res, next) => {
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

router.delete(
  '/:id', async (req, res, next) => {
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
