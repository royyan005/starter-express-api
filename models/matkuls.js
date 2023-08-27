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
      matkuls.hasMany(models.sub_matkuls, {
        foreignKey: 'matkul_id',
        as: 'sub_matkuls'
      });
      matkuls.hasMany(models.nilai_matkuls, {
        foreignKey: 'matkul_id',
        as: 'nilai_matkuls'
      })
    }
  }
  matkuls.init({
    sks: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    kode_matkul: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matkuls',
  });
  return matkuls;
};