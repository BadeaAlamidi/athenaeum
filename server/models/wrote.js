'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Wrote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wrote.init({
    bookId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Books',
        key: 'id'
      }
    },
    writerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Authors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Wrote',
  });
  return Wrote;
};