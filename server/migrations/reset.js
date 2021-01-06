/**
 * This script is responsible for reseting the SQL database.
 * Run it via `npm run db:reset`.
 */
require('dotenv').config()
const { model } = require('mongoose');
const models = require('../models');
const roles =  require('./roles');
const taskStatuses =  require('./taskStatuses');
const approvedStatuses =  require('./approvedStatuses');

console.log(`Resetting Database...`);

models.sequelize
	.sync({
		force: true
	})

	.then(async () => {
		await models.Role.bulkCreate(roles);
		await models.TaskStatus.bulkCreate(taskStatuses);
		await models.ApprovedStatus.bulkCreate(approvedStatuses);
		console.log('OK');
		process.exit();
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
