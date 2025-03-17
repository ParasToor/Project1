const { DataTypes } = require("sequelize");
const { sequelize } = require("../databaseConfig/configuration");

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);


module.exports = Role;