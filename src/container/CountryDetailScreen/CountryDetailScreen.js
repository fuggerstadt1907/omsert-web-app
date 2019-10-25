import React, { Component, Fragment } from 'react';
import { getCountryByName } from '../../services/country/CountryService';
import ErrorComponent from '../../components/ErrorLoadingComponent/ErrorComponent';
import LoadingComponent from '../../components/ErrorLoadingComponent/LoadingComponent';
import DetailCard from '../../components/CountryDetailScreen/DetailCard/DetailCard';
import ShareModal from '../../components/CountryDetailScreen/ShareModal/ShareModal';
import Map from '../../components/CountryDetailScreen/Map/Map';


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

        if (isLoading) {
            content = <LoadingComponent />
        }
        else if (error || fetchedCountry === null) {
            content = <ErrorComponent />
        }
        else {
            content = (
                <Fragment>
                    <DetailCard
                        alpha3Code={fetchedCountry.alpha3Code}
                        imgSrc={fetchedCountry.flag}
                        name={fetchedCountry.name}
                        capital={fetchedCountry.capital}
                        region={fetchedCountry.region}
                        currency={fetchedCountry.currencies[0].name}
                        symbol={fetchedCountry.currencies[0].symbol}
                        timezone={fetchedCountry.timezones}
                        openShare={this.show(open)}
                    />
                    <ShareModal open={open} close={this.close} url={window.location.href} />
                    <Map />
                </Fragment>
            )
        }
        return (
            <Fragment>
                {content}
            </Fragment >
        );
    }
}

export default countryDetail;