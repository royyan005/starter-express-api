'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembimbings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pembimbings.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'users'
      });
      pembimbings.belongsTo(models.mahasiswas, {
        foreignKey: 'mahasiswa_id',
        as: 'mahasiswas'
      });
      pembimbings.hasMany(models.nilai_matkuls, {
        foreignKey: 'pembimbing_id',
        as: 'nilai_matkuls'
      });
    }
  }
  pembimbings.init({
    user_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    user_full_name: DataTypes.STRING,
    mahasiswa_full_name: DataTypes.STRING,
    jenis_role: DataTypes.ENUM("pembimbing1","pembimbing2","penguji"),
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembimbings',
  });
  return pembimbings;
};