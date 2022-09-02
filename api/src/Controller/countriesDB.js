const {Country, Activities, Op} = require('../db.js')


// -----------MUESTRA LA INFORMACION DE LA BASE DE DATOS--------------
async function getCountriesDB(){
    const countries = await Country.findAll({
        attributes: ['id', 'name', 'flag', 'continent', 'population'],
        include:[{
                model: Activities,
                attributes: ['name']
            }]
        });
    return countries;
}

// -----------MUESTRA LA INFORMACION DE LA BASE DE DATOS CON ID--------------
async function getIdDB(idCountry)
{
    const country = await Country.findByPk(idCountry, {
        include:[{
            model: Activities,
            attributes: ['name', 'difficulty', 'duration', 'season']
        }]
    });
    if(!country) {
        throw new Error("This country does not exist")
    };
    return country;
}

// -----------MUESTRA LA INFORMACION DE LA BASE DE DATOS CON NAME-----------------
async function getNameDB(nameCountry) {
    const country = await Country.findAll({
        attributes: ['id', 'name', 'flag', 'continent', 'population'],
        where:{
            name:{
                [Op.like]: `%${nameCountry}%`
            }
        },
        include:[{
            model: Activities,
            attributes: ['name']
                }]
        });
    if(country.length === 0) {
        throw new Error("This country does not exist")
    };
    return country;
}

module.exports = {getCountriesDB, getIdDB, getNameDB}