import React, {Component} from 'react'
import logo from '../BA2.png';
import axios from 'axios'
import { Link } from 'react-router-dom'

var _ = require('lodash');

const FLIGHTSERVER_URL = 'http://localhost:3000/flights.json'
const PLANESERVER_URL = 'http://localhost:3000/planes.json'


class SearchForm extends Component {
  constructor () {
    super ()
     this.state = {origin: '', destination: ''}
    this._handleChangeOrigin = this._handleChangeOrigin.bind(this)
    this._handleChangeDestination = this._handleChangeDestination.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChangeOrigin(event){
    this.setState({origin: event.target.value})
    console.log(this.state);
  }
  _handleChangeDestination(event){
    this.setState({destination: event.target.value})
    console.log(this.state);
  }
  //
  _handleSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state)

    //todo clear input
  }


  render () {
    return (

      <form onSubmit={this._handleSubmit}>
        <label>
          From:
          <input type="text" name="name" onChange={this._handleChangeOrigin} value={this.state.origin}/>
        </label> <p>
        <label>
          To:
          <input type="text" name="name" onChange={this._handleChangeDestination} value={this.state.destination}/>
        </label> </p>
      <input type="submit" value="Search" className="button" />

      </form>

    )
  }
}


class ListFlights extends Component {
  render () {
    return (
      <div>

      {_.filter(this.props.flights.flights, { 'origin': this.props.flights.origin, 'destination': this.props.flights.destination }).map((f) => <p key ={f.id}>{f.origin} > {f.destination} <br/>Flight: <Link to={`/reservation/${f.plane_id}/${f.id}`}> {f.flight_num}</Link> <br/> Date: {f.date}</p>)}
      {this.props.flights.planes.map((f) => <p key= {f.id}> </p>)}
      </div>
    )
  }
}


// => objects for ['barney']

class Search extends Component {
  constructor () {
    super ()

    this.state = {
      planes: [],
      flights: [],
      origin: '',
      destination: ''
    }
    this.saveFlight= this.saveFlight.bind(this)


    const fetchFlights = () => {
      axios.get(FLIGHTSERVER_URL).then((results) => {
        this.setState({flights: results.data})
        setTimeout(fetchFlights, 4000)
      })
    }
    fetchFlights()


    const fetchPlanes = () => {
      axios.get(PLANESERVER_URL).then((results) => {
        this.setState({planes: results.data})
        setTimeout(fetchPlanes, 4000)
      })
    }
    fetchPlanes()
  }

  saveFlight(state){
      this.setState({origin: state.origin, destination: state.destination})
  }

  render () {
    return (
      <div className="content">
      <div className="image">
        <img src={logo} alt="Burning Airlines"></img>
      </div>

      <div className="search">
        <h2>Search a flight</h2> <br/>
        <SearchForm onSubmit={this.saveFlight}/>
        <ListFlights flights={this.state}/>
      </div>
</div>
  )}
}

export default Search
