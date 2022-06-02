'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Book, {through:models.Tagmapping, foreignKey:'tagID'});
    }
  }
  Tag.init({
    tagname: {
      type:DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};