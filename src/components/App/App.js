import React, { Component } from 'react';
import './App.css';
import Panel from '../Panel/Panel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
    };
  }

  render() {
    return (
      <div id="App">
        <header id="header">
          React Timer
        </header>
        <Panel />
        <div id="result-wrapper">
          <ul className="list">
            <li className="line">
              <span className="count">count 1</span>
              <span className="time">00:17.83</span>
            </li>
            <li className="line">
              <span className="count">count 1</span>
              <span className="time">00:17.83</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
