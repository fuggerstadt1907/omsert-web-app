import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getCountryByName } from '../../services/country/CountryService';
import { Button, Card, Image, Icon, Input, Loader, Modal, Placeholder } from 'semantic-ui-react';
import ErrorComponent from '../../components/ContentPlaceholder/ErrorComponent';
import LoadingComponent from '../../components/ContentPlaceholder/LoadingComponent';


class countryDetail extends Component {

    state = {
        fetchedCountry: null,
        open: false,
        isLoading: true,
        error: false,
    }

    show = () => () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    initMap = (lat, lng, countryName) => {
        const mapPosition = { lat: lat, lng: lng };
        const google = window.google
        const map = new google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: mapPosition, disableDefaultUI: true });
        new google.maps.Marker({ position: mapPosition, map: map });
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': countryName }, function (results, status) {
            if (google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.fitBounds(results[0].geometry.viewport);
            }
        });
    }

    componentDidMount() {
        getCountryByName(this.props.match.params.name)
            .then(result => {
                this.setState({ fetchedCountry: result[0], isLoading: false, error: false })
                this.initMap(result[0].latlng[0], result[0].latlng[1], result[0].name)
            })
            .catch(error => {
                this.setState({ fetchedCountry: [], isLoading: false, error: true })
            })
    }

    render() {
        const { fetchedCountry, open, isLoading, error } = this.state;
        let content = null;
        const mapStyles = {
            width: '100%',
            height: '50vh',
            margin: 'auto',
            backgroundColor: 'lightgrey'
        };

        if (isLoading || fetchedCountry === null) {
            content = <LoadingComponent />
        }
        else if (error) {
            content = <ErrorComponent />
        }
        else {
            content = (
                <div>
                    <Card centered key={fetchedCountry.alpha3Code} style={{ marginTop: '25px', width: '80%' }}>
                        {isLoading ? (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        ) : (
                                <Image style={{ backgroundColor: 'white' }} src={fetchedCountry.flag} />
                            )}

                        <Card.Content>
                            <Fragment>
                                <Card.Header>{fetchedCountry.name}</Card.Header>
                                <Card.Meta>Capital: {fetchedCountry.capital} ({fetchedCountry.region})</Card.Meta>
                                <Card.Description>
                                    <p style={{ margin: '15px 0px 5px 0' }}><b>Currency:</b> {fetchedCountry.currencies[0].name} ({fetchedCountry.currencies[0].symbol})</p>
                                    <p style={{ marginBlockEnd: '0' }}><b>Timezone(s):</b></p>
                                    <ul style={{ listStyle: 'none', textAlign: 'center', paddingInlineStart: '0px', marginBlockStart: '0' }}>{fetchedCountry.timezones.map(zone => {
                                        return <li key={fetchedCountry.alpha3Code + Math.random().toString(36).substr(2, 9)} style={{ display: 'inline' }}>{zone}  </li>
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
                                onClick={this.show(open)}
                            />
                        </Card.Content>
                    </Card>

                    <Modal open={open} onClose={this.close}>
                        <Modal.Header style={{ fontFamily: 'Asap' }}>Share Country</Modal.Header>
                        <Modal.Content style={{ fontFamily: 'Asap' }}>
                            <p>Use this URL to share the country details with your friends.</p>
                            <Input label='URL' style={{ width: '100%' }} value={window.location.href} />
                        </Modal.Content>
                        <Modal.Actions >
                            <Button
                                style={{ fontFamily: 'Asap', backgroundColor: '#651FFF', color: 'white' }}
                                onClick={this.close}
                            >
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    < div id="map" style={mapStyles} />
                </div >
            )
        }
        return (
            <div>
                {content}
            </div >
        );
    }
}

export default countryDetail;