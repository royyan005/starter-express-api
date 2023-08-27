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
      mahasiswas.hasMany(models.pembimbings, {
        foreignKey: 'mahasiswa_id',
        as: 'pembimbings'
        });
      mahasiswas.hasMany(models.nilai_matkuls, {
        foreignKey: 'mahasiswa_id',
        as: 'nilai_matkuls'
        });
    }
  }
  mahasiswas.init({
    full_name: DataTypes.STRING,
    npm: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mahasiswas',
  });
  return mahasiswas;
};