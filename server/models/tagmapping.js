'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Tagmapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tagmapping.init({
    bookID: {
      type: DataTypes.INTEGER,
      references:{
        model:'Books',
        key:'id',
      }
    },
    tagID: {
      type: DataTypes.INTEGER,
      references:{
        model:'Tags',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Tagmapping',
  });
  return Tagmapping;
};