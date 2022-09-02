const { DataTypes } = require('sequelize');
const {country} = require('./Country')
const {activities} = require('./Activities.js')

module.exports = (sequelize) => {
    sequelize.define('countryActivities',{
        countryId:{
            type: DataTypes.INTEGER,
            references:{
                model: country,
                key: 'id'
            }
        },
        activityId:{
            type: DataTypes.INTEGER,
            references:{
                model: activities,
                key: 'id'
            }
        }
    },{timestamps: false});
}