import React, { Component } from 'react'
import Search from './Search'
import styled from 'styled-components'
// import Navbar from './components/Navbar'


class App extends Component {
  render() {
    return (
      <navbar>
        <div className="App">
        {/* <Navbar/> */}
        <Search />
        </div>
      </navbar>
    );
  }
}

export default App;
