'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipamento.belongsTo(models.Obra);
    }
  }
  Equipamento.init({
    nome: DataTypes.STRING,
    codigo: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    etiqueta: DataTypes.STRING,
    obraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipamento',
  });
  return Equipamento;
};