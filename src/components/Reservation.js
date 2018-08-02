import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { range } from 'lodash';
var _ = require('lodash');



const FLIGHTSERVER_URL = 'http://localhost:3000/flights/'
const PLANESERVER_URL = 'http://localhost:3000/planes/'
const RESSERVER_URL = 'http://localhost:3000/reservations.json'
const RESSERVERGET_URL = 'http://localhost:3000/reservations.json'


class Plane extends Component {
constructor(props){
  super (props)
  this.state={seat: '', flight: this.props.flightprops, user: 1, reservedSeats: []}
  console.log(this.props.flightprops);
this._handleClick = this._handleClick.bind(this)
this._handleSubmit = this._handleSubmit.bind(this)

const fetchRes = () => {

  axios.get(RESSERVERGET_URL).then((results) => {
    console.log(results.data);
    let data = results.data
    console.log(props.flightprops);
    let data2 = _.filter(data, {flight_id: +(props.flightprops)})
    console.log(data2);
    let data3 = data2.map((x) => x.seat)

    this.setState({reservedSeats: data3}, function () {
      console.log(this.state);
  })
    console.log(data3);
    console.log(data2);
    console.log(this.state.reservedSeats);
    console.log(this.props.flightprops);
    console.log(_.filter(results.data, {'flight_id': this.props.flightprops}));

  })
}
fetchRes()
}

_handleClick(event){

  console.log(this.state);
  if(event.target.style.backgroundColor == 'red'){

  }
  else if(event.target.style.backgroundColor == 'green'){
    event.target.style.backgroundColor='cornflowerblue'
    this.setState({seat: [...this.state.seat - event.target.dataset.value]})
    console.log(this.state);
  }
  else {
  event.target.style.backgroundColor='green'
  this.setState({seat: event.target.dataset.value}, function () {
    console.log(this.state);
});


}

}
saveSeat(seats){
  console.log(this.state);
  console.log(seats.seat);
console.log(axios.post(RESSERVER_URL, {user_id: 1, flight_id: 5, seat:1}));
  axios.post(RESSERVER_URL, {seat: seats.seat, user_id: 1, flight_id: seats.flight }).then((results) => {
    console.log(results.data);
this.setState({reservedSeats: [results.data.seat, ...this.state.reservedSeats]})

    }).catch(function (error) {
    console.log(error.response);
  });
}



_handleSubmit(event){
  event.preventDefault()
    this.saveSeat(this.state)
this.setState({seat: ''})
}

  render () {
    const rows = range(+(this.props.planes.rows))
    const columns = range(+(this.props.planes.columns)).map(num => String.fromCharCode(num + 65))


console.log(columns);

    return (
      <div>
      <p>FLight: {this.props.planes.flight_num}, {this.props.planes.plane}</p>
               <p>{this.props.planes.origin} > {this.props.planes.destination}</p>

               {console.log(this.props.planes.origin)}
               <p>Seats: {+(this.props.planes.columns) * +(this.props.planes.rows)}</p>




        <table className='flighttable'>
          <tbody>
            {rows.map(row => (
              <tr>

                {columns.map(column =>(
                  <td key={row+1 + column} onClick={this._handleClick} data-value={row+1+column} style={ this.state.reservedSeats.includes(row+1+column) ? { backgroundColor: 'red' } : {}  }>{row+1+column}</td>
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
    this.state = {flight_num: '', plane_id: props.match.params.plane_id, rows: '', columns: '', plane: '', origin: '', destination: ''}
3
    const fetchPlanes = () => {
      console.log(PLANESERVER_URL+`${props.match.params.plane_id}`+".json");
      axios.get(PLANESERVER_URL+`${props.match.params.plane_id}`+".json").then((results) => {
        this.setState({plane: results.data.name, rows: results.data.rows, columns: results.data.columns})
        console.log(results.data);

      })
    }
    fetchPlanes()


    const fetchFlight = () => {
      console.log(FLIGHTSERVER_URL+`${props.match.params.id}`+".json");
      console.log(props.match.params.id);
      axios.get(FLIGHTSERVER_URL+`${props.match.params.id}`+".json").then((results) => {
        this.setState({flight_num: results.data.flight_num, origin: results.data.origin, destination: results.data.destination})
        console.log(results.data);

      })
    }
    fetchFlight()

  }

  render() {
    return (

      <div className="booking">
        <h1>Your reservation</h1>
          <Plane planes={this.state} flightprops={this.props.match.params.id} onSubmit={this.saveSeat}/>

      </div>
    );
  }
}

export default Reservation;
