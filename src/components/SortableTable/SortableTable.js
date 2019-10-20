import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'


export default class SortableTable extends Component {
    state = {
        column: null,
        data: this.props.countries,
        direction: null,
    }

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    render() {
        const { column, data, direction } = this.state
        const formatter = new Intl.NumberFormat('en');

        return (
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
                        data.map(country => {
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
}