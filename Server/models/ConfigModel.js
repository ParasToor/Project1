const { DataTypes } = require("sequelize");
const { sequelize } = require("../databaseConfig/configuration");

const Config = sequelize.define("configs", {
  id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  ip_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  protocol: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  base_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  api_endpoint: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  access_token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  api_key: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  client_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  client_secret: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  encryption_key: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cert_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  db_host: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  db_port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  db_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  db_username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  db_password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  tableName: "configs", // Ensure the table name is explicit
  timestamps: false,
});

module.exports = Config;
