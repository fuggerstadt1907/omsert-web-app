import React, { Component } from 'react';
import { getCountryByName } from '../../services/country/CountryService';
import { Loader, Button, Modal } from 'semantic-ui-react';
import { Item } from 'semantic-ui-react'


class countryDetail extends Component {

    state = {
        country: this.props.match.params.name,
        fetchedCountry: null,
        open: false
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    copyToClipboardHandler = () => {
        const copiedText = window.location.href;
        navigator.clipboard.writeText(copiedText)
            .then(() => {
                console.log('Async: Copying to clipboard was successful!');
                this.close()
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
    }

    componentDidMount() {
        getCountryByName(this.state.country)
            .then(result => {
                this.setState({ fetchedCountry: result[0] })
                let mapPosition = { lat: result[0].latlng[0], lng: result[0].latlng[1] };
                const google = window.google
                let map = new google.maps.Map(
                    document.getElementById('map'), { zoom: 4, center: mapPosition, disableDefaultUI: true });
                new google.maps.Marker({ position: mapPosition, map: map });
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': result[0].name }, function (results, status) {
                    if (google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        map.fitBounds(results[0].geometry.viewport);
                    }
                });
            })
            .catch(error => {
                console.log('Error while fetching data from api: ' + error);
            })
    }

    render() {
        const { fetchedCountry } = this.state
        const { open, size } = this.state
        let modalText = window.location.href + '';
        const mapStyles = {
            width: '100%',
            height: '50vh',
            margin: 'auto',
            backgroundColor: 'lightgrey'
        };

        let content = null;

        if (fetchedCountry === null) {
            content = <div style={{ marginTop: '30px' }}><Loader active inline='centered' /><p>Loading</p></div>
        }
        else {
            content = (
                <div>
                    <Item style={{ padding: '25px' }}>
                        <Item.Content>
                            <Item.Header style={{ fontSize: '30px', lineHeight: '30px' }}>{fetchedCountry.name}</Item.Header>
                            <Item.Meta style={{ margin: '15px 0px 5px 0' }}><b>Capital:</b> {fetchedCountry.capital}</Item.Meta>
                            <Item.Meta style={{ margin: '0px 0px 10px 0' }}><b>Continent:</b> {fetchedCountry.region}</Item.Meta>
                            <Item.Image size='small' src={fetchedCountry.flag} />
                            <Item.Description>
                                <p style={{ margin: '15px 0px 5px 0' }}><b>Currency:</b> {fetchedCountry.currencies[0].name} ({fetchedCountry.currencies[0].symbol})</p>
                                <p style={{ marginBlockEnd: '0' }}><b>Timezone(s):</b></p>
                                <ul style={{ listStyle: 'none', textAlign: 'center', paddingInlineStart: '0px', marginBlockStart: '0' }}>{fetchedCountry.timezones.map(zone => {
                                    return <li key={fetchedCountry.alpha3Code + Math.random().toString(36).substr(2, 9)} style={{ display: 'inline' }}>{zone}  </li>
                                })}
                                </ul>
                            </Item.Description>
                        </Item.Content>
                    </Item>

                    <Button
                        icon='fork'
                        label={{ as: 'a', basic: true, content: 'Share this Page' }}
                        labelPosition='left'
                        style={{ margin: '10px 0px 20px 0px' }}
                        size='tiny'
                        primary
                        onClick={this.show('tiny')}
                    />

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>Share Country</Modal.Header>
                        <Modal.Content>
                            <p>{modalText}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button

                                onClick={this.close}
                            >
                                Close</Button>
                            <Button
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content='Copy to clipboard'
                                onClick={this.copyToClipboardHandler}
                            />
                        </Modal.Actions>
                    </Modal>

                    {/* <Modal closeIcon
                        trigger={
                            
                        }
                        header={'Share information about ' + fetchedCountry.name}
                        content={modalText}
                        actions={[{ key: 'copy', content: 'Copy to clipboard', positive: true }]}

                    >
                    </Modal> */}

                </div >
            )
        }
        return (
            <div>
                {content}
                < div id="map" style={mapStyles} />
            </div >
        );
    }
}

export default countryDetail;