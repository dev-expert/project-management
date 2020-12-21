var express = require('express');
var router = express.Router();
const UserModel = require('../models/user');
const createUsers = async (payload, filter = null, updateMany = false) => {
  try {
    let result = null;
    if(filter !== null) {
      if(updateMany) {
        result = await UserModel.updateMany(filter, payload);
      } else {
        result = await UserModel.updateOne(filter, payload);
      }
    } else {
      result = await UserModel.create(payload);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
const findUsers = async (filter={}, onlyOne=false) => {
  try {
    let result = null;
    if(onlyOne) {
      result = await UserModel.findOne(filter);
    } else {
      result = await UserModel.find(filter);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
router.get(
  '/', async (req, res, next) => {
    try {
      const user = req.user.username;
      const result =  await findUsers({ createdBy: user });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/', async (req, res, next) => {
    try {
      const username = req.user.username;
      const user = req.body;
      user.createdBy = username;
      const result =  await createUsers(user);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result =  await findUsers({ _id: id }, true);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.put(
  '/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const result =  await createUsers({ $set: updatedUser }, { _id: id });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
