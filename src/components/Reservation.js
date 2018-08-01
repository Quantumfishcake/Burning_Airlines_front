import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
var _ = require('lodash');



const FLIGHTSERVER_URL = 'http://localhost:3000/flights.json'
const PLANESERVER_URL = 'http://localhost:3000/planes.json'






class Reservation extends Component {
  constructor () {
    super ()
    this.state = {flight_num: this.props.match.params.flight_num}




  }

  render() {
    return (
      <div className="App">
        <h1>Reservation</h1>
          <p>Please visit <Link to='/reservation'>SEARCH</Link></p>
          <p>Flight: {this.props.match.params.flight_num}</p>

      </div>
    );
  }
}

export default Reservation;
