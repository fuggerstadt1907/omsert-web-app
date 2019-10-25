import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './DetailCard.css';


const detailCard = (props) => {
    return (
        <Card centered key={props.alpha3Code} style={{ marginTop: '25px', minWidth: '70%' }}>

            <Image style={{ backgroundColor: 'white', margin: 'auto' }} src={props.imgSrc} />

            <Card.Content>
                <Fragment>
                    <div className='omsert-font'><Card.Header>{props.name}</Card.Header></div>
                    <Card.Meta>Capital: {props.capital} ({props.region})</Card.Meta>
                    <Card.Description>
                        <p style={{ margin: '15px 0px 5px 0' }}><b>Currency:</b> {props.currency} ({props.symbol})</p>
                        <p style={{ marginBlockEnd: '0' }}><b>Timezone(s):</b></p>
                        <ul style={{ listStyle: 'none', textAlign: 'center', paddingInlineStart: '0px', marginBlockStart: '0' }}>
                            {props.timezone.map(zone => {
                                return <li key={props.alpha3Code + Math.random().toString(36).substr(2, 9)} style={{ display: 'inline' }}>{zone}  </li>
                            })}
                        </ul>
                    </Card.Description>
                </Fragment>
            </Card.Content>

            <Card.Content textAlign="center">
                <Link to="/" style={{ color: 'black' }}>
                    <Button
                        size="large"
                        style={{ fontFamily: 'Asap', backgroundColor: 'white', border: '1px solid #651FFF', color: '#651FFF' }}
                    >
                        <Icon name='angle double left' />Back
                    </Button>
                </Link>
                <Button
                    size="large"
                    style={{ fontFamily: 'Asap', backgroundColor: '#651FFF', border: '1px solid #651FFF', color: 'white' }}
                    onClick={props.openShare}
                >
                    <Icon name='share' />Share
                </Button>
            </Card.Content>

        </Card>
    );
}

detailCard.propTypes = {
    alpha3Code: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
    currency: PropTypes.string,
    symbol: PropTypes.string,
    timezone: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]),
    openShare: PropTypes.func
};

export default detailCard;