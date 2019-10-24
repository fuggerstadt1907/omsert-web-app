import * as Constants from '../../../constants';
import React from 'react';
import { Table } from 'semantic-ui-react';
import LinkCountry from './LinkCountry/LinkCountry';

const table = (props) => {
    return (
        <Table sortable stackable unstackable striped>
            <Table.Header>
                <Table.Row>

                    <Table.HeaderCell sorted={props.sortedByName} onClick={props.onClickName}>
                        Name
                    </Table.HeaderCell>

                    <Table.HeaderCell sorted={props.sortedByPopulation} onClick={props.onClickPopulation}>
                        Population
                    </Table.HeaderCell>

                    <Table.HeaderCell>
                        Flag
                    </Table.HeaderCell>

                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.filteredCountries.map(country => {
                    return (
                        <Table.Row key={country.name}>

                            <Table.Cell>
                                <LinkCountry name={country.name}>
                                    {country.name}
                                </LinkCountry>
                            </Table.Cell>

                            <Table.Cell>
                                <LinkCountry name={country.name}>
                                    {Constants.populationFormatter.format(country.population)}
                                </LinkCountry>
                            </Table.Cell>

                            <Table.Cell>
                                <LinkCountry name={country.name}>
                                    <img src={country.flag} alt="country_flag" width="70px" height="50px" />
                                </LinkCountry>
                            </Table.Cell>

                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    );
}

export default table;