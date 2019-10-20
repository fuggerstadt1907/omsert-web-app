import _ from 'lodash';
import React, { Component } from 'react';
import { getAllCountries } from '../../services/country/CountryService';
import { Table } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react'


export default class SortableTable extends Component {
    state = {
        column: null,
        direction: null,
        countries: [],
        isLoading: true
    }

    componentDidMount() {
        getAllCountries()
            .then(result => {
                this.setState({ countries: result, isLoading: false })
            })
            .catch(error => {
                console.log(error);
            })
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
        const { column, countries, direction } = this.state
        const formatter = new Intl.NumberFormat('en');

        let home = null;
        if (this.state.isLoading) {
            home = <div style={{ marginTop: '30px' }}><Loader active inline='centered' /><p>Loading</p></div>
        }
        else {
            home = (
                <Table sortable selectable stackable unstackable striped>
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
                            countries.map(country => {
                                return (
                                    <Table.Row key={country.name} onClick={() => alert('You clicked ' + country.name)}>
                                        <Table.Cell>{country.name}</Table.Cell>
                                        <Table.Cell>{formatter.format(country.population)}</Table.Cell>
                                        <Table.Cell><img src={country.flag} alt="country_flag" width="70px" height="50px" /></Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            )
        }

        return (
            <div>
                {home}
            </div>
        )
    }
}