/*import { React, useEffect, useState, Fragment } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries} from '../redux/actions.js'
import Cards from './Cards'
import Paginated from './Paginated'
import { Link } from "react-router-dom";

export default function Home(){
    let dispatch = useDispatch();
    let select = useSelector(state => state.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesForPage] = useState(10);

    const indexOfLastCountries = currentPage * countriesForPage;
    const indexOfFirstCountries = indexOfLastCountries - countriesForPage;
    const currentCountries = select.slice(
        indexOfFirstCountries,
        indexOfLastCountries
    );

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getAllCountries())
    }, [dispatch])

    return(
        /*<div path='/Home' className = 'home'>
            <h1>Página principal</h1>
            <Paginated countriesForPage={countriesForPage} select={select.length} paginated={paginated}/>
            <div>
                {currentCountries.length && currentCountries.map(e =>
                    <Cards name = {e.name} flag = {e.flag} continent = {e.continent} key = {e.id}/>
                )}
            </div>
        </div>*/
        /*<div>
        <Paginated countriesForPage={countriesForPage} select={select.length} paginated={paginated} />
        {currentCountries && currentCountries.map((e) => {
            return (
                <Fragment>
                    <Link to={"/Home/" + e.id}>
                        <Cards name = {e.name} flag = {e.flag} continent = {e.continent} key = {e.id}/>
                    </Link>
                </Fragment>
            );
        })}
        </div>
    )
}*/
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getAllCountries} from '../redux/actions'
import {Link} from 'react-router-dom';
import Cards from './Cards'
import logoPrev from '../style/icons/arrowLeft.png';
import logoNext from '../style/icons/arrowRight.png';
let style = require ('../style/css/home.module.css');

export default function Home(){
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    let [currentPage, setCurrentPage] = React.useState(1);
    let [cardsPerPage, setCardsPerPage] = React.useState(10);
    let [pageNumberLimit, setPageNumberLimit] = React.useState(5);
    let [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(5);
    let [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0);

    let indexOfLastCard;
    let indexOfFirstCard;
    let currentCards;
    
    if(filters.hasOwnProperty('error') === false){
        indexOfLastCard = currentPage === 1 ? currentPage * (cardsPerPage - 1) : currentPage * cardsPerPage;
        indexOfFirstCard = currentPage === 1 ? indexOfLastCard - (cardsPerPage - 1) : indexOfLastCard - cardsPerPage;
        currentCards = currentPage === 1 ? filters.slice(indexOfFirstCard, indexOfLastCard) : filters.slice(indexOfFirstCard-1, indexOfLastCard-1);
    }
    let pages = [];
    let pageIncrementBtn = null;
    let pageDecrementBtn = null;

    React.useEffect(() =>
    {
            if (filters.length === 0)
            {
                dispatch( getAllCountries())
            }
    },[dispatch, filters]);

    for (let i = 1; i <= Math.ceil(filters.length / cardsPerPage); i++)
    {
        pages.push(i);
        if(i === 1) console.log(filters.length);
    }

    if (pages.length > maxPageNumberLimit)  pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
    if (minPageNumberLimit >= 1) pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;

    function handleClick(e)
    {
        setCurrentPage(Number(e.target.id));
    }

    function handleNextBtn()
    {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit)
        {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    function handlePrevBtn()
    {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0)
        {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const renderPageNumbers = pages.map((number) =>
    {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit)
        {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={(e) => handleClick(e)}
                >
                    {number}
                </li>
            );
        }
        else return null;
    });

    let controlPagination = (
        <ul className={style.contControlPagination}>
            <li>
                <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false} className={style.contControlPagination__Btn}>
                    <div><img src={logoPrev} alt="Previus page" /></div>
                </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false} className = {style.contControlPagination__Btn}>
                    <div><img src={logoNext} alt="Next page" /></div>
                </button>
            </li>
        </ul>);

return (
    <React.Fragment>
        {controlPagination}
        <div className={style.contCards}>
            {
                filters.hasOwnProperty('error')? <div> <p> {filters.error} </p> </div>:
                currentCards&&currentCards.map(e => {
                    return (
                        <div key={e.id} className={style.card}>
                            <Link to={"/Home/" + e.id}>
                                <Cards  name = {e.name} flag = {e.flag} continent = {e.continent} key = {e.id} />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
        {controlPagination}
    </React.Fragment>)
}