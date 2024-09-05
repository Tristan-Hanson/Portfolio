const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connect');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },

          password: {
            type: DataTypes.STRING(500),
            allowNull: false,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;