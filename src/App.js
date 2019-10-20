import React, { Component } from 'react';
import logo from './logo-white.svg';
import './App.css';
import { getAllCountries, getCountryByName } from './services/country/CountryService';
import SortableTable from './components/SortableTable/SortableTable';
import { Loader } from 'semantic-ui-react'


class App extends Component {

  state = {
    isLoading: true,
    countries: []
  }

  searchCountryHandler = (event) => {
    getCountryByName(event.target.value).then(result => {
      console.log('getCountryByName: ', result)
      return true;
    })
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

  render() {

    let home = null;
    if (this.state.isLoading) {
      home = <div style={{ marginTop: '30px' }}><Loader active inline='centered' /><p>Loading</p></div>
    } else {
      home = <SortableTable countries={this.state.countries} />
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Earth Advisor!!</h1>
        </header>
        {home}
      </div>
    );
  }
}

export default App;
