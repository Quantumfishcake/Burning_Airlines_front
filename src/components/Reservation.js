import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { range } from 'lodash';
var _ = require('lodash');



const FLIGHTSERVER_URL = 'http://localhost:3000/flights/'
const PLANESERVER_URL = 'http://localhost:3000/planes/'
const RESSERVER_URL = 'http://localhost:3000/reservation/'


class Plane extends Component {
constructor(props){
  super (props)
  this.state={seat: ''}
this._handleClick = this._handleClick.bind(this)
}

_handleClick(event){
  if(event.target.style.backgroundColor == 'red'){
    event.target.style.backgroundColor='white'
    this.setState({seat: " "})
  }
  else {
  event.target.style.backgroundColor='red'
}
  this.setState({seat: event.target.dataset.value} )
  console.log(event.target.dataset.value);
}

_handleSubmit(event){
  event.preventDefault()
    this.props.onSubmit(this.state.content)

}



  render () {
    const rows = range(+(this.props.planes.rows))
    const columns = range(+(this.props.planes.columns)).map(num => String.fromCharCode(num + 65))
    const aplh = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

console.log(columns);

    return (
      <div>
      <p>Flight: {this.props.planes.flight_num}</p>
        <p>Plane: {this.props.planes.plane}</p>
        <p>Rows: {this.props.planes.rows}</p>
        <p>Columns: {this.props.planes.columns}</p>
        <p>Seats: {+(this.props.planes.columns) * +(this.props.planes.rows)}</p>
        <table className='flighttable'>
          <tbody>
            {rows.map(row => (
              <tr>
                {columns.map(column =>(
                  <td key={row+1 + column} onClick={this._handleClick} data-value={row+1 +column}>{row + 1}{column}</td>
                ))}
                </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this._handleSubmit}>
    <textarea  value={this.state.seat}></textarea>
    <input type='submit' value='Book' />
    </form>
      </div>

    )
  }
}

class Reservation extends Component {
  constructor (props) {
    super (props)
    this.state = {flight_num: '', plane_id: props.match.params.plane_id, rows: '', columns: '', plane: ''}
3
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
          <Plane planes={this.state} onSubmit={this.saveSeat}/>
      </div>
    );
  }
}

export default Reservation;
