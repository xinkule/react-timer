import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import Panel from '../Panel/Panel';
import AppStore from '../../model/AppStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = new AppStore();
  }

  handleCountButtonClick = (isRunning, countTime) => {
    if (isRunning) {
      const formatTime = countTime.format('mm:ss.SS');
      this.store.addItem(formatTime);
    } else {
      this.store.empty();
    }
  };

  render() {
    return (
      <div id="App">
        <header id="header">React Timer</header>
        <Panel onCountButtonClick={this.handleCountButtonClick} />
        <div id="result-wrapper">
          <ul className="list">
            {this.store.timeList.map(row => (
              <li className="line" key={row.count}>
                <span className="count">count {row.count}</span>
                <span className="time">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default observer(App);
