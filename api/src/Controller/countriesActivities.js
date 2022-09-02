const {Activities} = require('../db.js')

const postCountriesDB = async(name, difficulty, duration, season, country) => {
    const myName = name[0].toUpperCase() + name.slice(1);
    const mySeason = season[0].toUpperCase() + season.slice(1);
    const myCountry = country.map(el => el.toUpperCase());

    const activity = await Activities.findOrCreate({
        where: {
            name: myName
        },
        defaults: {difficulty, duration, season: mySeason}
    });

    if(activity[1] === false) throw new Error('This activity has already exist');
    else{
        activity[0].setCountries(myCountry)
        return activity[0];
    }
}

async function getActivities(){
    try{
        const activities = await Activities.findAll({
                attributes: ['id', 'name'],
            });
        return activities;
    }
    catch(error){
        throw error;
    }
}

module.exports = {postCountriesDB, getActivities}

