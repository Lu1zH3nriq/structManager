'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ObraMaterial', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      obraId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Obras',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      materialId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materials',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      quantidade: {
        type: Sequelize.STRING, 
        allowNull: true,
        defaultValue: null, 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ObraMaterial');
  },
};
