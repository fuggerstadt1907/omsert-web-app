import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { getAllCountries } from '../../services/country/CountryService';
import ErrorComponent from '../../components/ErrorLoadingComponent/ErrorComponent';
import LoadingComponent from '../../components/ErrorLoadingComponent/LoadingComponent';
import Search from '../../components/SortableTable/Search/Search';
import Table from '../../components/SortableTable/Table/Table';

export default class SortableTable extends Component {
    state = {
        column: null,
        direction: null,
        countries: [],
        isLoading: true,
        searchLoading: false,
        error: false,
        selectedCountry: null,
        searchValue: ''
    }

    componentDidMount() {
        getAllCountries()
            .then(result => {
                this.setState({ countries: result, isLoading: false, error: false })
            })
            .catch(error => {
                this.setState({ error: true, isLoading: false })
            })
    }

    searchHandler = (event) => {
        this.setState({ searchValue: event.target.value.substr(0, 200) })
    }

    handleSort = (clickedColumn) => () => {
        const { column, countries, direction } = this.state
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                countries: _.sortBy(countries, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }
        this.setState({
            countries: countries.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        let content = null;
        const { column, countries, direction, error, isLoading } = this.state
        const filteredCountries = countries.filter((country) => {
            return country.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
        });

        if (isLoading) {
            content = <LoadingComponent />
        } else if (error) {
            content = <ErrorComponent />
        }
        else {
            content = (
                <Fragment>
                    <Search
                        loading={this.state.searchLoading}
                        searchHandler={this.searchHandler.bind(this)}
                    />
                    <Table
                        sortedByName={column === 'name' ? direction : null}
                        onClickName={this.handleSort('name')}
                        sortedByPopulation={column === 'population' ? direction : null}
                        onClickPopulation={this.handleSort('population')}
                        filteredCountries={filteredCountries}
                    />
                </Fragment>
            )
        }

        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}