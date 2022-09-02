import React from 'react';
import Nav from './Nav';
import Side from './Side';
import Panel from './Panel';
let style = require('../style/css/page.module.css')

export default function Page()
{
    return (
        <React.Fragment>
            <div className={style.grid}>
                <div className={style.grid__header}>
                    <Nav typeBar="secondary"/>
                </div>

                <div className={style.grid__article}>
                    <Side className={style.grid__section} typeLeft="secondary"/>
                </div>
                <div className={style.grid__footer}>
                    <Panel typeContent="showForm"/>
                </div>
            </div>
        </React.Fragment>
    )
}