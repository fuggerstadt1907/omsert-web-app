import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const detailCard = (props) => {
    return (
        <Card centered key={props.alpha3Code} style={{ marginTop: '25px', width: '80%' }}>

            <Image style={{ backgroundColor: 'white' }} src={props.imgSrc} />

            <Card.Content>
                <Fragment>
                    <Card.Header>{props.name}</Card.Header>
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
                        icon='angle double left'
                        color="grey"
                        label={{ basic: true, content: 'Back' }}
                        size='medium'
                    />
                </Link>
                <Button
                    icon='fork'
                    color="violet"
                    label={{ as: 'a', basic: true, content: 'Share' }}
                    size='medium'
                    onClick={props.openShare}
                />
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
    timezone: PropTypes.string,
    openShare: PropTypes.func
};

export default detailCard;