'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('services', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      service_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_tarif: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};
