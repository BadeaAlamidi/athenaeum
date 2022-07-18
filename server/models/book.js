'use strict';
// const {
//   Model
// } = require('sequelize');
import { Model } from 'sequelize';
export default /*const BooksTable =*/ (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category)
      this.belongsToMany(models.Author,{through:models.Wrote, foreignKey: 'bookId'});
      this.belongsToMany(models.Tag, {through: models.Tagmapping, foreignKey: 'bookID'});
    }
  }
  Book.init({
    isbn10: DataTypes.STRING,
    isbn13: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    maturityRating: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    smallThumbnailUrl: DataTypes.STRING,
    language: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    pageCount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    textSnippet: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};