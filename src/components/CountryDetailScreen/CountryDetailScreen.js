import React, { useEffect } from 'react';

const countryDetail = (props) => {

    useEffect(() => {
        console.log(props);
    })

    return (
        <div>
            <h1>Country Details</h1>
            <p>{props.match.params.name}</p>
        </div>
    );
}

export default countryDetail;