'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Obra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Obra.belongsTo(models.Cliente);
      Obra.belongsTo(models.TipoObra);
      Obra.hasMany(models.Funcionario);
      Obra.hasMany(models.Equipamento);
    }
  }
  Obra.init({
    codigo: DataTypes.STRING,
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numContrato: DataTypes.STRING,
    numAlvara: DataTypes.STRING,
    rtProjeto: DataTypes.STRING,
    rtExec: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    orcamento: DataTypes.FLOAT,
    clienteId: DataTypes.INTEGER,
    tipoObraId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Obra',
  });
  return Obra;
};