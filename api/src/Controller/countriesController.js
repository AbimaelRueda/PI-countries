const axios = require('axios');
const {Country, Activities} = require('../db.js')
const API = `https://restcountries.com/v3/all`;

const getCountries = async() => {
        let response = await axios.get(`https://restcountries.com/v3/all`);
    const c = await Country.findAll({
        attributes: ['id', 'name', 'flag', 'continent', 'population'],
        include:[{
                model: Activities,
                attributes: ['name']
            }]
        });
        if(c.length > 0){
            console.log('Base de datos almacenada...')
            return(c);
        }else{
            if(response.data){
        var country = response.data.map((countries) => {
            return {
                id: countries.cca3,
                name: countries.name.common,
                flag: countries.flags[0],
                continent: countries.region,
                capital: countries.capital != null ? countries.capital[0]: 'No data',
                subregion: countries.subregion,
                area: countries.area <= 0 ? null:countries.area,
                population: countries.population <= 0 ? null: countries.population,
            }
        })
    }
    let filterCountry = country.filter(c=> c !== undefined)
    await Country.bulkCreate(filterCountry,{validate: true});
    const c = await Country.findAll({
        attributes: ['id', 'name', 'flag', 'continent', 'population'],
        include:[{
                model: Activities,
                attributes: ['name']
            }]
        });
    //return countries;
    return c;}
}

const getId = async(idCountry) => {
    let response = await axios.get(`https://restcountries.com/v3/alpha/${idCountry}`)
    if(response.data){
        var idCountry = response.data.map(element => {
            return {
                id: element.cca3,
                name: element.name.common,
                flag: element.flags[0],
                continent: element.region,
                capital: element.capital[0],
                subregion: element.subregion,
                area: element.area,
                population: element.population
            }
        })
    }
    return idCountry;
}

const getName = async(name) => {
    let response = await axios.get(`https://restcountries.com/v3/name/${name}`)
    if(response.data){
        var nameCountry = response.data.map(element => {
            return {
                name: element.name.common,
            }
        })
    }
    return nameCountry;
}

const getOrder = async(order) => {
    let myOrder;
        let countries = await Country.findAll(
            {
                attributes: ['id', 'name', 'flag', 'continent', 'population'],
                include:
                [
                    {
                        model: Activities,
                        attributes: ['name']
                    }
                ]
            });
            console.log(countries);
        if(order === 'a-z') myOrder = countries.sort(sortByName);
        else if(order === 'z-a') myOrder = countries.sort(sortByName).reverse();
        else if(order === 'ascending') myOrder = countries.sort((a, b) => a.population - b.population);
        else myOrder = countries.sort((a, b) => b.population - a.population);
        return myOrder;
}

function sortByName(x, y){
    return x.name.localeCompare(y.name, 'fr', {ignorePunctuation: true});
}


module.exports = {getCountries, getId, getName, getOrder};