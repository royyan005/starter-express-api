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
      nilai_sub_matkuls.belongsTo(models.sub_matkuls, {
        foreignKey: 'sub_matkul_id',
        as: 'sub_matkuls'
      });
      nilai_sub_matkuls.belongsTo(models.nilai_matkuls, {
        foreignKey: 'nilai_matkul_id',
        as: 'nilai_matkuls'
      });
      nilai_sub_matkuls.hasMany(models.nilai_sub_sub_matkuls, {
        foreignKey: 'nilai_sub_matkul_id',
        as: 'nilai_sub_sub_matkuls'
      });
    }
  }
  nilai_sub_matkuls.init({
    sub_matkul_id: DataTypes.INTEGER,
    nilai_matkul_id: DataTypes.INTEGER,
    nilai: DataTypes.FLOAT,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nilai_sub_matkuls',
  });
  return nilai_sub_matkuls;
};