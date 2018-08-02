import React, { Component } from 'react';
import logo from '../BA2.png';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="image">
          <img src={logo} alt="Burning Airlines"></img>
        </div>
        <h1 className="flex-1"></h1>
          <p>Looking for a flight ? <button><Link to='/search'>Search</Link></button></p>
  </div>
    );
  }
}

export default Home;
