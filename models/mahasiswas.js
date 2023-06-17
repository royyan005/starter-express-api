'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mahasiswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mahasiswas.init({
    full_name: DataTypes.STRING,
    npm: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    ipk: DataTypes.FLOAT,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mahasiswas',
  });
  return mahasiswas;
};