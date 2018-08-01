import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>Burning Airlines</h1>
          <p>Looking for a flight ? <button><Link to='/search'>Search</Link></button></p>
      </div>
    );
  }
}

export default Home;
