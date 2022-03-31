'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING,
        unique:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // await queryInterface.addColumn(
    //   'Authors',
    //   'bookId',
    //   {
    //     type: Sequelize.INTEGER,
    //     references:{
    //       model: 'Books',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL',
    //   }
    // );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
    // await queryInterface.removeColumn(
    //   'Authors',
    //   'bookId'
    // );
  }
};