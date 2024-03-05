const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
      id: {
        type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         allowNull: false,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      lastName: {
         type: DataTypes.STRING,
         allowNull: false
      },
      image: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      nationality: {
         type: DataTypes.STRING,
         allowNull: false
      },
      bornDate: {
         type: DataTypes.STRING,
         allowNull: false
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true
      },
      createdInDb: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      },
   }, { timestamps: false });
};