const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,   //genera un numero random con letras y numeros unico, datatype ya determinado de sequalize
      defaultValue: DataTypes.UUIDV4,  //valor por defecto random
      allowNull: false,  //no permite ser nulo
      primaryKey: true  //como es id es mi pk
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    }, 
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    img:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,    //todos los que cree se van a crear con esta propiedad
      allowNull: false,
      defaultValue: true
    }
  });
};
