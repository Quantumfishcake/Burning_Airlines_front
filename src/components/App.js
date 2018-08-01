import React, { Component } from 'react'
import Search from './Search'
import styled from 'styled-components'




class App extends Component {
  render() {
    return (

        <div className="App">
          <navbar>
            <Search />
              </navbar>
        </div>

    );
  }
}

export default App;
