import React, { Component } from 'react'
import Search from './Search'
import  styled from 'styled-components'

const Base = styled.text`
  text-align: center;
  color: black;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Base><Search /></Base>
      </div>
    );
  }
}

export default App;
