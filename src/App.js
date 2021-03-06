import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import Routes from './components/layout/Routes';
import 'materialize-css/dist/js/materialize';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container" id="mainSection">
            <Routes/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
