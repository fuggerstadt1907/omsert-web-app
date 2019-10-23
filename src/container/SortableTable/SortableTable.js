import _ from 'lodash';
import React, { Component } from 'react';
import { getAllCountries } from '../../services/country/CountryService';
import { Link } from 'react-router-dom';
import { Icon, Input, Loader, Table } from 'semantic-ui-react'

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
                this.setState({ countries: result, isLoading: false })
            })
            .catch(error => {
                this.setState({ error: true, isLoading: false })
                console.log('Error while fetching data from api: ' + error);
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
        const { column, countries, direction, error, isLoading } = this.state
        let content = null;
        const formatter = new Intl.NumberFormat('en');
        const filteredCountries = countries.filter((country) => {
            return country.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
        });

        if (isLoading) {
            content = <div style={{ marginTop: '30px' }}><Loader active inline='centered' /><p>Loading</p></div>
        } else if (error) {
            content = <div style={{ marginTop: '30px' }}><Icon name='warning sign' />Error while fetching data...</div>
        }
        else {
            content = (
                <div>
                    <Input
                        icon='search'
                        placeholder='Search...'
                        loading={this.state.searchLoading}
                        style={{ fontFamily: 'Asap', margin: '10px', width: '70%', borderRadius: '20px', padding: '5px' }}
                        onChange={this.searchHandler.bind(this)}
                    />

                    <Table sortable stackable unstackable striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={this.handleSort('name')}
                                >
                                    Name
                        </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'population' ? direction : null}
                                    onClick={this.handleSort('population')}
                                >
                                    Population
                        </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Flag
                        </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                filteredCountries.map(country => {
                                    return (
                                        <Table.Row key={country.name}>

                                            <Table.Cell>
                                                <Link
                                                    to={{
                                                        pathname: '/name/' + country.name,
                                                    }}
                                                    style={{ color: 'black' }}
                                                >
                                                    {country.name}
                                                </Link>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Link
                                                    to={{
                                                        pathname: '/name/' + country.name,
                                                    }}
                                                    style={{ color: 'black' }}
                                                >
                                                    {formatter.format(country.population)}
                                                </Link>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Link
                                                    to={{
                                                        pathname: '/name/' + country.name,
                                                    }}

                                                >
                                                    <img src={country.flag} alt="country_flag" width="70px" height="50px" />
                                                </Link>
                                            </Table.Cell>

                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}