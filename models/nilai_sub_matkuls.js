'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nilai_sub_matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nilai_sub_matkuls.init({
    sub_matkul_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    nilai: DataTypes.FLOAT,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nilai_sub_matkuls',
  });
  return nilai_sub_matkuls;
};