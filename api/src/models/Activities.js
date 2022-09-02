const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('activities', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "The name can't be empty"}
            },
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: {msg: "The difficult must be a number"},
                min: {
                    args: 1,
                    msg: "The difficult mus be a number between 1 and 5"
                },
                max: {
                    args: 5,
                    msg: "The difficult mus be a number between 1 and 5"
                }
            },
            difficult(){
                let valor = this.DataValue('difficulty');
                if(value === 1){
                    return 'So easy'
                }else {
                    if(value === 2){
                        return 'Easy'
                    } else {
                        if(value === 3){
                            return 'Normal'
                        }else {
                            if(value === 4){
                                return 'Hard'
                            }else {
                                return 'So hard'
                            }
                        }
                    }
                }
            }
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isInt: {
                    msg:"'Hrs'.'Min'"
                },
                time(times){
                    let hours = Math.trunc(times);
                    let minutes;
                    if(hours === 0 ){
                      minutes = times * 100;
                    }else{
                        minutes = ((times % hours) * 100);
                    }
                    if(hours > 8 || (minutes === 0 && hours <= 0)){
                        throw new Error('The hours is not valid');
                    }
                    if(minutes < 0 || minutes > 59){
                        throw new Error('The minutes is not valid')
                    }
                },
                changeTime(){
                    let hours = Math.trunc(this.getDataValue('duration'));
                    let minutes = (this.getDataValue('duration') % hours).toFixed(2) * 100;
                    return `${hours}:${minutes} hrs.`;
                },
            }
        },
        season: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isIn: {
                    args: [['Winter', 'Spring', 'Summer', 'Autumn']],
                    msg: "Season not valid"
                }
            }
        }
    },{timestamps: false});
};
