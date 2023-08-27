'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_matkuls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_matkuls.belongsTo(models.matkuls, {
        foreignKey: 'matkul_id',
        as: 'matkuls'
      });
      sub_matkuls.hasMany(models.sub_sub_matkuls, {
        foreignKey: 'sub_matkul_id',
        as: 'sub_sub_matkuls'
      });
      sub_matkuls.hasMany(models.klasifikasi_sub_matkuls, {
        foreignKey: 'sub_matkul_id',
        as: 'klasifikasi_sub_matkuls'
      });
    }
  }
  sub_matkuls.init({
    matkul_id: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    kode_sub_matkul: DataTypes.STRING,
    is_sub_sub_matkul: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sub_matkuls',
  });
  return sub_matkuls;
};