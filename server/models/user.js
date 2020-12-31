'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserDetails, {
        foreignKey: "userId",
      })

      User.hasMany(models.Project, {
        foreignKey: "client"
      })

      User.hasMany(models.Project, {
        foreignKey: "users"
      })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'MANAGER', 'EMPOLOYEE', 'CLIENT'),
    active: DataTypes.BOOLEAN,
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
  }
  },{
    hooks: {
      beforeValidate: async(user, options) => {
        var pass = () => {
          return bcrypt.hash(user.password, bcrypt.genSaltSync(10))
        }
        if(user.password){
          var hash =  await pass()
          user.password = hash
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
