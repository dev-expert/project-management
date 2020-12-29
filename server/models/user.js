// var mongoose = require('mongoose')
// var Schema = mongoose.Schema
// var bcrypt = require('bcrypt');

// /**
//  * user schema
//  */
// var userSchema = new Schema({
//   firstName: { type: String },
//   lastName: { type: String },
//   username: { type: String, required: true, unique: true },
//   date_created: { type: Date, default: new Date() },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: ['ADMIN', 'CLIENT', 'USER'], uppercase: true, default: 'ADMIN' },
//   createdBy: { type: String }
// })
// userSchema.pre(
//     'save',
//     async function(next) {
//       const user = this;
//       const hash = await bcrypt.hash(user.password, 10);
//       this.password = hash;
//       next();
//     }
// );
// userSchema.methods.isValidPassword = async function(password) {
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);  
//     return compare;
// }
// module.exports = mongoose.model('user', userSchema)

const bcrypt = require("bcrypt");

'use strict';
const {
  Model
} = require('sequelize');
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
