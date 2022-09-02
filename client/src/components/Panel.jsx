import React from 'react';
import Home from './Home.jsx'
import Details from './Details.jsx'
import Form from './Form.jsx'
let style = require ('../style/css/panel.module.css')

export default function Panel(props){
    const myPanel = props.typeContent === 'showPagination'?
    (
        <React.Fragment>
            <div className={style.contPagination}>
                <Home/>
            </div>
        </React.Fragment>
    )
    :
    (props.typeContent === 'showCard'?
        (
            <React.Fragment>
                <div className={style.contCardCountry}>
                    <Details/>
                </div>
            </React.Fragment>
        )
        :
        (
            <React.Fragment className={style.contForm}>
                <div>
                    <Form/>
                </div>
            </React.Fragment>
        )
    )

    return myPanel;
}