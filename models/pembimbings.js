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
    }
  }
  pembimbings.init({
    user_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    jenis_role: DataTypes.ENUM("PEMBIMBING1","PEMBIMBING2","PENGUJI"),
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembimbings',
  });
  return pembimbings;
};