'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetails.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      })
    }
  };
  UserDetails.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    altEmail: DataTypes.STRING,
    phone: DataTypes.STRING,
    altPhone: DataTypes.STRING,
    country: DataTypes.STRING,
    timezone: DataTypes.STRING,
    skype: DataTypes.STRING,
    dob: DataTypes.DATE,
    departmentId: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    employeeCode: DataTypes.STRING,
    imageUrl: DataTypes.TEXT,
    referenceBy: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'UserDetails',
  });
  return UserDetails;
};
