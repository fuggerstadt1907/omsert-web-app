import React, { Component } from 'react';
import logo from './logo-white.svg';
import './App.css';
import { getAllCountries, getCountryByName } from './services/country/CountryService';


class App extends Component {

  state = {
    isLoading: false,
    data: []
  }

  render() {

    // getAllCountries().then(result => {
    //   result.map(country => {
    //     console.log(country.name)
    //     return true;
    //   })
    //   const germany = result.find(country => country.name === 'Germany');
    //   console.log(germany);
    //   return true;
    // })

    getCountryByName('germany').then(result => {
      console.log('getCountryByName: ', result)
      return true;
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Earth Advisor</h1>
        </header>
      </div>
    );
  }
}

export default App;
