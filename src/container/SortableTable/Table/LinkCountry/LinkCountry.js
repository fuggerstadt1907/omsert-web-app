import React from 'react';
import { Link } from 'react-router-dom';

const linkCountry = (props) => {
    return (
        <Link to={{ pathname: '/name/' + props.name, }} style={{ color: 'black' }} >
            {props.children}
        </Link>
    );
}

export default linkCountry;