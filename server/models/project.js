'use strict'
const {
  Model
} = require ('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, {
        foreignKey: "client",
        as: "clientDetails",
        onDelete: "CASCADE"
      })

      Project.belongsTo(models.User, {
        foreignKey: "users",
      })
    }
  };
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    client: DataTypes.INTEGER,
    users: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Project',
  });
  return Project;
}