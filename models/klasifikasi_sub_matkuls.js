'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class klasifikasi_sub_matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  klasifikasi_sub_matkuls.init({
    sub_matkul_id: DataTypes.INTEGER,
    nilai_min: DataTypes.INTEGER,
    nilai_max: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    kode_klasifikasi: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'klasifikasi_sub_matkuls',
  });
  return klasifikasi_sub_matkuls;
};