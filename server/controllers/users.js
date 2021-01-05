const UserModel = require('../models').User;
const RoleModel = require('../models').Role;
var Sequelize = require('sequelize');
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
		let result = [];
		if (onlyOne) {
			result = await UserModel.findOne({
				where: { active: true },
				include: [{ model: RoleModel, as: 'role' }]
			});
		} else {

			const where = {
				active: true
			}
			const ORFilter = [];
			if (filter.query.email) {
				ORFilter.push({
					email: {
						[Sequelize.Op.like]: `%${filter.query.email}%`
					}
				})
			}
			if (filter.query.name) {
				ORFilter.push({
					firstName: {
						[Sequelize.Op.like]: `%${filter.query.name}%`
					}
				})

				ORFilter.push({
					lastName: {
						[Sequelize.Op.like]: `%${filter.query.name}%`
					}
				})
			}



			if (filter.query.role) {
				where.roleId = filter.query.role;
			}
			where = { ...where, [Sequelize.Op.or]: ORFilter }

			let users = await UserModel.findAndCountAll({
				where,
				offset: parseInt(filter.query.offset),
				limit: parseInt(filter.query.limit),
				include: [{ model: RoleModel, as: 'role' }]
			});
			result.push({ data: users.rows, 'totalRecords': users.count });
		}
		return result;
	} catch (err) {
		throw err;
	}
}

const Methods = {};

Methods.create = async (req, res, next) => {
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
	try {
		const { role, id } = req.user;
		if (role !== 'ADMIN') {
			// filter.createdBy = id
		}

		var result = await findUsers({ query: req.query })
		return res.json(result);
	}
	catch (error) {
		next(error);
	}
}

Methods.findOne = async (req, res, next) => {
	try {
		const { id } = req.params;
		var result = await findUsers({ id }, true)
		res.json(result);
	}
	catch (error) {
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