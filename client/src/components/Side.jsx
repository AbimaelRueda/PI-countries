import React from 'react';
import Filter from './Filter.jsx';

export default function Side(props)
{
    const myPanel = props.typeLeft === 'principal'?
    (
        <React.Fragment>
            <div>
                <Filter/>
            </div>
        </React.Fragment>
    )
    :
    (
        <React.Fragment>
            <div></div>
        </React.Fragment>
    )

    return myPanel;
}