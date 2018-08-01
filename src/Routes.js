import React from 'react'
import {HashRouter as Router, Route } from 'react-router-dom'


import Search from './components/Search'
import App from './components/App'
import Home from './components/Home'
import Reservation from './components/Reservation'


const Routes = (
<Router>
  <div>

    <Route exact path='/' component={ Home } />
    <Route exact path='/search' component={ App } />
    <Route exact path='/reservation/:flight_num' component={ Reservation } />


  </div>
</Router>
)


export default Routes
