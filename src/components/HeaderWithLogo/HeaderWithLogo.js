import React from 'react';
import logo from '../../assets/logo-white.svg';
import '../App/App.css';

const headerWithLogo = (props) => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Earth Advisor</h1>
        </header>
    );
}

export default headerWithLogo;