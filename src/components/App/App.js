import React, { Component } from 'react';
import './App.css';
import HeaderWithLogo from '../HeaderWithLogo/HeaderWithLogo';
import SortableTable from '../../container/SortableTable/SortableTable';
import CountryDetailScreen from '../../components/CountryDetailScreen/CountryDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as Constants from '../../constants';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderWithLogo />
          <Route exact path={Constants.HOME} component={SortableTable} />
          <Route exact path={Constants.NAME} component={CountryDetailScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
