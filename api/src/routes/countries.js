const express = require('express')
const routerCountries = express.Router();
const {getCountries, getId, getName, getOrder} = require('../Controller/countriesController.js')
const {getCountriesDB, getIdDB, getNameDB} = require('../Controller/countriesDB')

routerCountries.get('/', async(req, res) => {
    let {name} = req.query;
        try {
            if(name){
                const myName = name[0].toUpperCase() + name.slice(1);
                res.status(200).send(await getNameDB(myName))
            }else{
                res.status(200).send(await getCountries())
            }
        }
        catch(e){
            res.status(400).send({error: e.message});
        }
});

routerCountries.get('/order/', async(req, res, next) => {
    try{
        let{order} = req.query;
        const result = await getOrder(order);
        console.log(result)
        res.json(result);
    }catch(error){
        next(error);
    }
})

routerCountries.get('/:idCountry', async(req, res) => {
    let {idCountry} = req.params;
    let result = await getIdDB(idCountry.toUpperCase());
    res.json(result)
    //let api = await getId(idCountry.toUpperCase());
    //res.json(api)
});


module.exports = routerCountries;