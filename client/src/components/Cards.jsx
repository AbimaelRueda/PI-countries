import React from "react";

export default function Cards({name, flag, continent, id}){
    return(
        <div>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <img src={flag} alt="img" width="170vw" height="125vw"/>
            </div>
            <div>
                <h4>{continent}</h4>
            </div>
            <div>
                <h4>{id}</h4>
            </div>
        </div>
    )
}