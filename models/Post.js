const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // public_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // version: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // signature: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // likes: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   defaultValue: 0,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
