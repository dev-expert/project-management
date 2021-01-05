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
			allowNull: false,
		},
		requestPayload: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		requestJSON: { type: DataTypes.JSON, allowNull: false },
		stackTrace: { type: DataTypes.JSON, allowNull: false },
		
	}, {
		sequelize,
		timestamps: true,
		modelName: 'Role',
	});
	return ErrorLog;
};
