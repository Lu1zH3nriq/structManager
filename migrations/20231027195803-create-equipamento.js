"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Equipamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
      },
      codigo: {
        type: Sequelize.STRING,
      },
      marca: {
        type: Sequelize.STRING,
      },
      modelo: {
        type: Sequelize.STRING,
      },
      etiqueta: {
        type: Sequelize.STRING,
      },
      obraId: {
        type: Sequelize.INTEGER,
        references: {
          model: "obras",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
    await queryInterface.dropTable("Equipamentos");
  },
};
