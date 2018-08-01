import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { range } from 'lodash';
var _ = require('lodash');



const FLIGHTSERVER_URL = 'http://localhost:3000/flights/'
const PLANESERVER_URL = 'http://localhost:3000/planes/'


class Plane extends Component {
constructor(props){
  super (props)
  this.state={rows: '', columns: ''}
}
  render () {
    const rows = range(+(this.props.planes.rows))
    const columns = range(+(this.props.planes.columns))
    const aplh = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    var newcolumns = function (columns) {
      columns
    }

    return (
      <div>
      <p>FLight: {this.props.planes.flight_num}</p>
        <p>Plane: {this.props.planes.plane}</p>
        <p>Rows: {this.props.planes.rows}</p>
        <p>Columns: {this.props.planes.columns}</p>
        <p>Seats: {+(this.props.planes.columns) * +(this.props.planes.rows)}</p>
        <table className='flighttable'>
          <tbody>
            {rows.map(row => (
              <tr>
                {columns.map(column =>(
                  <td>{row + 1}{column +1}</td>
                ))}
                </tr>
            ))}


          </tbody>
        </table>
      </div>

    )
  }
}





class Reservation extends Component {
  constructor (props) {
    super (props)
    this.state = {flight_num: '', plane_id: props.match.params.plane_id, rows: '', columns: '', plane: ''}

    const fetchPlanes = () => {
      console.log(PLANESERVER_URL+`${props.match.params.plane_id}`+".json");
      axios.get(PLANESERVER_URL+`${props.match.params.plane_id}`+".json").then((results) => {
        this.setState({plane: results.data.name, rows: results.data.rows, columns: results.data.columns})
        console.log(results.data);
        setTimeout(fetchPlanes, 4000)
      })
    }
    fetchPlanes()


    const fetchFlight = () => {
      console.log(FLIGHTSERVER_URL+`${props.match.params.id}`+".json");
      axios.get(FLIGHTSERVER_URL+`${props.match.params.id}`+".json").then((results) => {
        this.setState({flight_num: results.data.flight_num})
        console.log(results.data);
        setTimeout(fetchPlanes, 4000)
      })
    }
    fetchFlight()



  }


  render() {
    return (
      <div className="App">
        <h1>Reservation</h1>
          <p>Plane id: {this.props.match.params.plane_id}</p>
          <p>Flight id: {this.props.match.params.id}</p>
          <Plane planes={this.state}/>
      </div>
    );
  }
}

export default Reservation;
