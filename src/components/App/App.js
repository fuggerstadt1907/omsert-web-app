import React, { Component } from 'react';
import './App.css';
import HeaderWithLogo from '../HeaderWithLogo/HeaderWithLogo';
import SortableTable from '../../container/SortableTable/SortableTable';
import CountryDetailScreen from '../../container/CountryDetailScreen/CountryDetailScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Constants from '../../constants';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderWithLogo />
          <Switch>
            <Route exact path={Constants.HOME} component={SortableTable} />
            <Route exact path={Constants.NAME + '/:name'} component={CountryDetailScreen} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;