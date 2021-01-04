'use strict'
const {
  Model
} = require ('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  };
  UserProject.init({
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
    modelName: 'UserProject',
	timestamps: true
  });
  return UserProject;
}