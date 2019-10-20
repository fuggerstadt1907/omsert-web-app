import React, { Component } from 'react';
import './App.css';
import HeaderWithLogo from '../HeaderWithLogo/HeaderWithLogo';
import SortableTable from '../../container/SortableTable/SortableTable';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderWithLogo />
          <SortableTable />
        </div></BrowserRouter>
    );
  }
}

export default App;
