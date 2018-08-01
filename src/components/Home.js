import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1>HOME</h1>
          <p>Please visit <Link to='/search'>SEARCH</Link></p>
      </div>
    );
  }
}

export default Home;
