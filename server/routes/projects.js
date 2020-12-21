var express = require('express');
var router = express.Router();
const ProjectModel = require('../models/project');
const createProjects = async (payload, filter = null, updateMany = false) => {
  try {
    let result = null;
    if(filter !== null) {
      if(updateMany) {
        result = await ProjectModel.updateMany(filter, payload);
      } else {
        result = await ProjectModel.updateOne(filter, payload);
      }
    } else {
      result = await ProjectModel.create(payload);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
const findProjects = async (filter={}, onlyOne=false) => {
  try {
    let result = null;
    if(onlyOne) {
      result = await ProjectModel.findOne(filter);
    } else {
      result = await ProjectModel.find(filter);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
router.get(
  '/', async (req, res, next) => {
    try {
      const result =  await findProjects({ createdBy: req.user.username });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/', async (req, res, next) => {
    try {
      const project = req.body;
      project.createdBy = req.user.username;
      console.log(project);
      const result =  await createProjects(project);
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
      const result =  await findProjects({ _id: id }, true);
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
      const updatedProject = req.body;
      const result =  await createProjects({ $set: updatedProject }, { _id: id });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
