const express = require('express')
const routerActivities = express.Router();
const {postCountriesDB, getActivities} = require('../Controller/countriesActivities.js')

routerActivities.post('/', async (req, res) => {
    try{
        const {name, difficulty, duration, season, country} = req.body;
        if(!name || !difficulty || !duration || !season || !country) {
            throw new Error("You're sending incomplete information")
        };
        const activity = await postCountriesDB(name.trim(), difficulty, duration, season, country);
        res.send({msg: 'The activity has been created successfully'});
    }catch(e){
        res.status(400).send({Error: e.message})
    }
})

routerActivities.get('/', async (req, res, next) =>{
    try{
        const activities = await getActivities();
        res.send(activities);
    }catch(error){
        next(error);
    }
})

module.exports = routerActivities