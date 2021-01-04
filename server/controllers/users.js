const UserModel = require('../models').User;
const RoleModel = require('../models').Role;
const createUsers = async (payload, filter = null, updateMany = false) => {

    try {
      let result = null;
      if (filter !== null) {
        if (updateMany) {
          result = await UserModel.updateMany(filter, payload);
        } else {
          result = await UserModel.update(payload, { where: filter });
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
  const findUsers = async (filter = {}, onlyOne = false) => {
    try {
      let result = null;
      if (onlyOne) {
        result = await UserModel.findOne({
          where: filter,
          include: [ { model: RoleModel, as: 'role' }]
        });
      } else {

        result = await UserModel.findAll({
          where: filter,
          include: [ { model: RoleModel, as: 'role' }]
        });
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

const Methods = {};

Methods.create = async (req,res, next) => {
    try {
        const { id } = req.user;
        const user = req.body;
        user.createdBy = id;
        const result = await createUsers(user);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

Methods.findAll = async (req, res, next) => {
    try{
        const { role, id } = req.user;
        const filter =  { active:true };
        if(role !== 'ADMIN') {
         // filter.createdBy = id
        }
        var result = await findUsers(filter)
        return res.json(result);
    }
    catch(error){
        next(error);
    }
}

Methods.findOne = async (req, res, next) => {
    try{
        const { id } = req.params;
        var result = await findUsers({ id }, true)
        res.json(result);
    }
    catch(error){
        next(error);
    }
}

Methods.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const result = await createUsers(updatedUser, { id });
        res.json(result);
    } catch (err) {
        next(err);
    }
}

Methods.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await createUsers({ active: false }, { id });
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = Methods;