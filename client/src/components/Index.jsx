import React from 'react';
import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
let style = require ("../style/css/index.module.css")
/*export default function Index(){
    return(
        <div>
            <div>
                <h1>Welcome to the Wolrd of Countries</h1>
            </div>
            <Link to='/Home'>
                <div>
                    <button> Welcome </button>
                </div>
            </Link>
        </div>
    );
}*/
export default function Index(){
    return(
        <div class={style.contPrincipal}>
                <div class = {style.contPrincipal__titulo}>
                    <h1>Welcome to the Wolrd of Countries</h1>
                </div>
                <button class={style.cta}>
                    <NavLink to={'/Pages'}>
                        <span>Welcome</span>
                        <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </NavLink>
                </button>
        </div>
    );
}