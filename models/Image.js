const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model { }

Image.init(
    {
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        signature: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'post_id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'image',
    }
);

module.exports = Image;