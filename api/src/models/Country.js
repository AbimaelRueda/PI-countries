const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        len: {
          args: [3,3],
          msg: 'The ID is only tree letters',
        },
        isAlpha: {msg: 'Only alphabetic characters'}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The name is not empty'
        }
      }
    },
    flag:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "The URL don't is validate"
        }
      }
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn:{
          args:  [['Americas','Europe','Asia','Africa','Oceania', 'Antarctic']],
          msg: 'Continent not valid'
        }
      }
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: "Don't allow empty strings"
        }
      }
    },
    subregion: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: "Don't allow empty strings"
        }
      }
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'The area must be a number integer'
        },
        isPopulation(value){
          if(value <= 0){
            throw new Error('The number is not valid in population')
          }
        }
      }
    },
  },{timestamps: false});
};
