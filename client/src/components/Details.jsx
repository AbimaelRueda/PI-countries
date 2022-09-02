/*import {React, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getCountriesId} from '../redux/actions.js'

export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const {name, flag, continent, capital, subregion, area, population, activities } = useSelector(state => state.countryDetail)

    useEffect(()=>{
        dispatch(getCountriesId(id))
    }, [dispatch, id])

    let renderActivities = activities === undefined ? <div><p>Loading</p></div> :
                    activities.length === 0 ? <div><p>This country doesn't has activities</p></div> :
                    activities && activities.map(el =>{
                        return (
                            <div key={el.id}>
                                <div >
                                    <p>Activity: {el.name}</p>
                                </div>
                                <div >
                                    <p>Difficulty: {el.difficulty}</p>
                                </div>
                                <div >
                                    <p>Duration: {el.duration}</p>
                                </div>
                                <div>
                                    <p>Sesion: {el.season}</p>
                                </div>
                            </div>
                        );
                    })

    return(
        id ?
        <div path='/Home'>
            <div>
                <img src={flag} alt="img"/>
            </div>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <h4>Continent: {continent}</h4>
                <h4>Capital: {capital}</h4>
                <h4>Region: {subregion}</h4>
                <h4>Area: {area}.0 km2</h4>
                <h4>Population: {population}</h4>
                <h4>Activities:</h4>
                <div>
                    {renderActivities}
                </div>


            </div>
        </div>
        : <div> Loading </div>
    )
}*/
import React from 'react';
import { useParams } from 'react-router-dom'
let style = require ('../style/css/details.module.css')

export default function Details(){
    const { id } = useParams();
    let [country, setCountry] = React.useState(
        {
            flag: '',
            name: '',
            id: '',
            continent: '',
            capital: '',
            subregion: '',
            area: null,
            population: null,
            activities: []
        })

    React.useEffect(() =>{
        fetch(`http://localhost:3001/countries/${id}`)
        .then(res => res.json())
        .then(data =>
            {
                let myMap = {
                    flag: data.flag,
                    name: data.name,
                    id: data.id,
                    continent: data.continent,
                    capital: data.capital,
                    subregion: data.subregion,
                    area: data.area,
                    population: data.population,
                    activities: data.activities
                }
                setCountry(myMap);
            })
    },[]);

    let renderActivities = country.activities === undefined ? <div><p>Loading</p></div> :
                    country.activities.length === 0 ? <div className={style.notActivity}><p>This country doesn't has activities</p></div> :
                    country.activities && country.activities.map(el =>{
                        return (
                            <div key={el.id} className={style.cardActivity}>
                                <div className={style.cardActivity__name}>
                                    <p>{el.name}</p>
                                </div>
                                <div className={style.cardActivity__divDifficult}>
                                    <div className={style.cardActivity__iconDifficult}></div>
                                    <p className={style.cardActivity__difficult} >{el.difficulty}</p>
                                </div>
                                <div className={style.cardActivity__divDuration}>
                                    <p className={style.cardActivity__duration}>{el.duration}</p>
                                    <div className={style.cardActivity__iconDuration}></div>
                                </div>
                                <div className={style.cardActivity__divSeason}>
                                    <div className={style.cardActivity__iconSeason}></div>
                                    <p className={style.cardActivity__difficult}>{el.season}</p>
                                </div>
                            </div>
                        );
                    })

    return (
        <React.Fragment>
            {
                country.id ?
                <div className={style.contCardCountry_2}>
                    <div className={style.countryCard}>
                        <div className={style.countryCard__imgBox}>
                            <img src={country.flag} alt={country.name}/>
                        </div>
                        <div className={style.countryCard__contInfo}>
                            <p className={style.countryCard__name}>{`${country.name} (${country.id})`}</p>
                            <p className={style.countryCard__capital}>Capital: {country.capital}</p>
                            <p className={style.countryCard__continent}>Contienet- {`${country.continent}  (${country.subregion})`}- Subregion</p>
                            <div className={style.countryCard__contInfoSec}>
                                <div className={style.countryCard__infoSec_left}>
                                        <div className={style.countryCard__boxGif}></div>
                                        <p className={style.countryCard__infoArea}>Area: {`${country.area}.0 km2`}</p>
                                </div>
                                <div className={style.countryCard__infoSec_right}>
                                    <div className={style.countryCard__boxGif_2}></div>
                                    <p className={style.countryCard__infoPopulation}>Population: {country.population}</p>
                                </div>
                            </div>
                            <div className={style.cardsActivities}>
                                {renderActivities}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={style.loading}></div>
            }
        </React.Fragment>
    )
}