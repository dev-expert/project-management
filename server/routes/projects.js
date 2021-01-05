var express = require('express');
var router = express.Router();
const ProjectModel = require('../models').Project;
const UserModel = require('../models').User;
var Sequelize = require('sequelize');

const createProjects = async (payload, filter = null, updateMany = false) => {
  try {
    let result = null;
    if (filter !== null) {
      if (updateMany) {
        result = await ProjectModel.updateMany(filter, payload);
      } else {
        result = await ProjectModel.update(payload, { where: filter });
      }
    } else {
      payload.active = true;
      result = await ProjectModel.create(payload);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
const findProjects = async (filter = {}, onlyOne = false) => {
  try {
    let result = [];
    if (onlyOne) {
      result = await ProjectModel.findByPk(filter.id);
    } else {

      let data = await ProjectModel.findAll({
        where: { active: true },
      });
      let projects = await ProjectModel.findAll({
        where: {
          active: true,
          [Sequelize.Op.or]: [{
            name: {
              [Sequelize.Op.like]: `%${filter.query.name}%`
            }
          },
          {
            description: {
              [Sequelize.Op.like]: `%${filter.query.description}%`
            }
          },
          ]
        },
        offset: parseInt(filter.query.offset),
        limit: parseInt(filter.query.limit),
      });
      result.push({ data: projects, 'totalRecords': data.length });
    }
    return result;
  } catch (err) {
    throw err;
  }
}
router.get(
  '/', async (req, res, next) => {
    try {
      const result = await findProjects({ query: req.query });
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
      // project.createdBy = req.user.username;
      console.log(project);
      const result = await createProjects(project);
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
      const result = await findProjects({ id: id }, true);
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
      const result = await createProjects(updatedProject, { id: id });
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
      const result = await ProjectModel.update({
        active: false,
      }, { where: { id: id } });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
