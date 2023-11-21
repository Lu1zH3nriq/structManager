'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ObraMaterial extends Model {
    static associate(models) {
      // Associações, se necessário
    }
  }

  ObraMaterial.init(
    {
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'ObraMaterial',
      tableName: 'ObraMaterial', // Certifique-se de definir o nome da tabela
    }
  );

  return ObraMaterial;
};