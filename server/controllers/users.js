const UserModel = require('../models').User;
const RoleModel = require('../models').Role;
var Sequelize = require('sequelize');
const createUsers = async (payload, filter = null, updateMany = false) => {

	try {
		let check = await UserModel.findOne({where:{email:payload.email}});
		if(check && check.dataValues != null){
			return {error:true,message:'email must be unique'};
		}
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
const findUsers = async (req, onlyOne = false) => {
	const { query, filter } = req;
	try {
		let result = [];
		if (onlyOne) {
			console.log(req);
			result = await UserModel.findOne({
				where: { active: true , id: req.id },

				include: [{ model: RoleModel, as: 'role' }]
			});
		} else {
			let where = {
				active: true
			}
			const ORFilter = [];
			if (query.email) {
				ORFilter.push({
					email: {
						[Sequelize.Op.like]: `%${query.email}%`
					}
				})
			}
			if (query.name) {
				ORFilter.push({
					firstName: {
						[Sequelize.Op.like]: `%${query.name}%`
					}
				})

				ORFilter.push({
					lastName: {
						[Sequelize.Op.like]: `%${query.name}%`
					}
				})
			}



			if (query.role) {
				where.roleId = query.role;
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

			let users = await UserModel.findAndCountAll({
				...filter,
				where,
				include: [{ model: RoleModel, as: 'role' }]
			});
			result.push({ data: users.rows, 'totalRecords': users.count });
		}
		return result;
	}catch (err) {
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
	}
    catch(error){
        next(error);
    }
}

Methods.findAll = async (req, res, next) => {
	try {
		const { role, id } = req.user;
		if (role !== 'ADMIN') {
			// filter.createdBy = id
		}

		var result = await findUsers(req)
		return res.json(result);
	}
    catch(error){
        next(error);
    }
}

Methods.findOne = async (req, res, next) => {
	try {
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
	}
    catch(error){
        next(error);
    }
}

Methods.delete = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await createUsers({ active: false }, { id });
		res.json(result);
	}
    catch(error){
        next(error);
    }
}

module.exports = Methods;