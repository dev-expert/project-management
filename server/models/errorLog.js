'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ErrorLog extends Model {

		static associate(models) {
		}
	};

	ErrorLog.init({
		userId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		userEmail: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		route: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		requestPayload: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		requestJSON: { type: DataTypes.JSON, allowNull: true },
		stackTrace: { type: DataTypes.JSON, allowNull: true },
		
	}, {
		sequelize,
		modelName: 'ErrorLog',
		timestamps: true,

	});
	return ErrorLog;
};
