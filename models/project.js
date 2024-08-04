const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connect');

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },

          description: {
            type: DataTypes.STRING(500),
            allowNull: false,
          },

          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Project',
    }
);

module.exports = Project;