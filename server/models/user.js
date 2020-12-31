'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const { rounds } = require('../env');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, {
        foreignKey: "client"
      })

      User.hasMany(models.Project, {
        foreignKey: "users"
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false 
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('ADMIN', 'MANAGER', 'EMPLOYEE', 'CLIENT'),
      allowNull: false,
      defaultValue: 'ADMIN'
    },
    active: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    createdAt: {
      field: 'createdAt',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      field: 'updatedAt',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
    hooks: {
      beforeValidate: async(user, options) => {
        if(user.password){
          var hash =  await bcrypt.hash(user.password, rounds);
          user.password = hash
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
