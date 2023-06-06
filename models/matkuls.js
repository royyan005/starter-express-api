'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  matkuls.init({
    total_nilai: DataTypes.FLOAT,
    average: DataTypes.FLOAT,
    sks: DataTypes.INTEGER,
    huruf_mutu: DataTypes.ENUM("A","B","C","D","E"),
    angka_mutu: DataTypes.FLOAT,
    nilai_mutu: DataTypes.FLOAT,
    deskripsi: DataTypes.STRING,
    kode_matkul: DataTypes.STRING,
    pembimbing_id: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matkuls',
  });
  return matkuls;
};