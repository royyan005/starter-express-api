'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_sub_matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_sub_matkuls.belongsTo(models.sub_matkuls, {
        foreignKey: 'sub_matkul_id',
        as: 'sub_matkuls'
      });
      sub_sub_matkuls.hasMany(models.klasifikasi_sub_sub_matkuls, {
        foreignKey: 'sub_sub_matkul_id',
        as: 'klasifikasi_sub_sub_matkuls'
      });
    }
  }
  sub_sub_matkuls.init({
    sub_matkul_id: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    kode_sub_sub_matkul: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sub_sub_matkuls',
  });
  return sub_sub_matkuls;
};