import React, { useEffect, useState } from 'react';
import { getCountryByName } from '../../services/country/CountryService';
import { Loader } from 'semantic-ui-react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as Constants from '../../constants';

const countryDetail = (props) => {

    const [country] = useState(props.match.params.name);
    const [fetchedCountry, setFetchedCountry] = useState(null)


    useEffect(() => {
        getCountryByName(country)
            .then(result => {
                setFetchedCountry(result[0])
                console.log(result[0])
            })
            .catch(error => {
                console.log('Error while fetching data from api: ' + error);
            })
    }, [])

    const mapStyles = {
        width: '80%',
        height: '80%',
        margin: 'auto',
    };

    let content = null;
    if (fetchedCountry === null) {
        content = <div style={{ marginTop: '30px' }}><Loader active inline='centered' /><p>Loading</p></div>
    }
    else {
        content = (
            <div>
                <h1>Country Details for {fetchedCountry.name}</h1>
                <h1>Capital is {fetchedCountry.capital}</h1>
                <h1>Timezone {fetchedCountry.timezones}</h1>
                <h1>Continent {fetchedCountry.region}</h1>
                <h1>Currency {fetchedCountry.currencies[0].name} ({fetchedCountry.currencies[0].symbol})</h1>

                <Map
                    google={props.google}
                    zoom={5}
                    zoomControl={false}
                    streetViewControl={false}
                    centerAroundCurrentLocation={true}
                    gestureHandling={true}
                    style={mapStyles}
                    bounds={{ lat: fetchedCountry.latlng[0], lng: fetchedCountry.latlng[0] }}
                    initialCenter={{ lat: fetchedCountry.latlng[0], lng: fetchedCountry.latlng[1] }}
                >
                    <Marker position={{ lat: fetchedCountry.latlng[0], lng: fetchedCountry.latlng[1] }} />
                </Map>

            </div>
        )
    }

    return (
        <div>
            {content}
        </div>

    );
}

export default GoogleApiWrapper({
    apiKey: Constants.MAPS_API_TOKEN
})(countryDetail);