import React from 'react';
import Nav from './Nav';
import Side from './Side';
import Panel from './Panel';

export default function Detail()
{
    return (
        <React.Fragment>
            <div>
                <div>
                    <Nav typeBar="secondary"/>
                </div>
                <div>
                    <Side typeLeft="secondary"/>
                </div>
                <div>
                    <Panel typeContent="showCard"/>
                </div>
            </div>
        </React.Fragment>
    )
}