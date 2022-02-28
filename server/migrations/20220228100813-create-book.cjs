'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn10: {
        type: Sequelize.CHAR(10)
      },
      isbn13: {
        type: Sequelize.CHAR(13)
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      subtitle: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      maturityRating: {
        type: Sequelize.STRING
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
      },
      smallThumbnailUrl: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.CHAR(3),
        allowNull:false
      },
      publishDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      pageCount: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      textSnippet: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};