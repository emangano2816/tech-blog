const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment_message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blog_id: {
            references: {
                model: 'posts',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments'
    }
);

module.exports = Comments;