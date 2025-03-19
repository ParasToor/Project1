const { DataTypes } = require("sequelize");
const { sequelize } = require("../databaseConfig/configuration");
const Role = require("./RoleModel");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "role_id", as: "roles" });

module.exports = User;
