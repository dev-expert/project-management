/**
 * This script is responsible for reseting the SQL database.
 * Run it via `npm run db:reset`.
 */
require('dotenv').config()
const models = require('../models');



console.log(`Resetting Database...`);

models.sequelize
	.sync({
		force: true
	})
	.then(async () => {
		console.log('OK');
		process.exit();
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
