'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasMany(models.Comment, {
        foreignKey: "repliedToCommentId",
        as: 'reply'
      })

      Comment.belongsTo(models.Comment, {
        foreignKey: "repliedToCommentId"
      })
    }
  };
  Comment.init({
    timeEntryId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    repliedToCommentId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },{
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
