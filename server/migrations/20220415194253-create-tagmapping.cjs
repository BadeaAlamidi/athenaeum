'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tagmappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookID: {
        type: Sequelize.INTEGER,
        references:{
          model:'Books',
          key: 'id'
        }
      },
      tagID: {
        type: Sequelize.INTEGER,
        references:{
          model:'Tags',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tagmappings');
  }
};