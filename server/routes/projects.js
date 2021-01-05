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
const findProjects = async (req, onlyOne = false) => {
	try {
		const { filter, query } = req;
		let result = [];

		if (onlyOne) {
			result = await ProjectModel.findByPk(query.id);
		} else {


			let where = {
				active: true
			}
			const ORFilter = [];
			if (query.description) {
				ORFilter.push({
					description: {
						[Sequelize.Op.like]: `%${query.description}%`
					}
				})
			}
			if (query.name) {
				ORFilter.push({
					name: {
						[Sequelize.Op.like]: `%${query.name}%`
					}
				})
			}
			if (ORFilter.length > 0) {
				where = {
					...where,
					[Sequelize.Op.or]: ORFilter
				}
			} else {
				where = {
					...where,
				}
			}


			let projects = await ProjectModel.findAndCountAll({
				...filter,
				where,
			});
			result.push({ data: projects.rows, 'totalRecords': projects.count });
		}
		return result;
	} catch (err) {
		throw err;
	}
}	
router.get(
	'/', async (req, res, next) => {
		try {
			const result = await findProjects(req);
			res.json(result);
	    }
		catch (error) {
		  next(error);
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
	    }
		catch (error) {
		  next(error);
		}
	}
);
router.get(
	'/:id', async (req, res, next) => {
		try {
			const { id } = req.params;
			const result = await findProjects({ id: id }, true);
			res.json(result);
	    }
		catch (error) {
		  next(error);
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
	    }
		catch (error) {
		  next(error);
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
	    }
		catch (error) {
		  next(error);
		}
	}
);
module.exports = router;
