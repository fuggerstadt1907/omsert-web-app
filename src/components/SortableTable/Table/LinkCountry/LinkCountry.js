import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const linkCountry = (props) => {
    return (
        <Link to={{ pathname: '/name/' + props.name, }} style={{ color: 'black' }} >
            {props.children}
        </Link>
    );
}

linkCountry.propTypes = {
    name: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default linkCountry;