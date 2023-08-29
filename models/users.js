'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.pembimbings, {
        foreignKey: 'user_id',
        as: 'pembimbings'
      });
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    role: DataTypes.ENUM("USER","ADMIN","SUPERADMIN"),
    nip: DataTypes.STRING,
    full_name: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};