const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Comp = db.define("Comp", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = Comp;
