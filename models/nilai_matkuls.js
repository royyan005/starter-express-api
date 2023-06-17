'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nilai_matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nilai_matkuls.init({
    average: DataTypes.FLOAT,
    huruf_mutu: DataTypes.ENUM("A","B","B+","C","C+","D","E"),
    angka_mutu: DataTypes.FLOAT,
    nilai_mutu: DataTypes.FLOAT,
    pembimbing_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    matkul_id: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nilai_matkuls',
  });
  return nilai_matkuls;
};