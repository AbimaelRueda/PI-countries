import React from 'react';
import Nav from './Nav';
import Side from './Side';
import Panel from './Panel'
let style = require ('../style/css/principal.module.css')

export default function Principal()
{
    return (
        <React.Fragment>
            <div className={style.grid}>
                <div className={style.grid__header}>
                    <Nav typeBar="principal"/>
                </div>

                <div className={style.grid__article}>
                    <Side typeLeft="principal"/>
                </div>

                <div className={style.grid__section}>
                    <Panel typeContent="showPagination"/>
                </div>
            </div>
        </React.Fragment>
    )
}