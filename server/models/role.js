'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {

		static associate(models) {
		}
	};
	
	Role.init({
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: DataTypes.BOOLEAN,
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		updatedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
		}
	},{
		sequelize,
		timestamps: true,
		modelName: 'Role',
	  });
	return Role;
};
