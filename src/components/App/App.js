import React, { Component } from 'react';
import './App.css';
import Panel from '../Panel/Panel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: [],
    };

    this.handleCountButtonClick = this.handleCountButtonClick.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem('timeList')) {
      this.setState({
        timeList: JSON.parse(window.localStorage.getItem('timeList')),
      });
    }
  }

  componentDidUpdate() {
    // sync to local storage
    window.localStorage.setItem('timeList', JSON.stringify(this.state.timeList));
  }

  handleCountButtonClick(isRunning, countTime) {
    if (isRunning) {
      const formatTime = countTime.format('mm:ss.SS');

      this.setState(prevState => {
        prevState.timeList.unshift({
          count: prevState.timeList.length + 1,
          time: formatTime,
        });

        return {
          timeList: prevState.timeList,
        };
      });
    } else {
      this.setState({ timeList: [] });
    }
  }

  render() {
    return (
      <div id="App">
        <header id="header">
          React Timer
        </header>
        <Panel onCountButtonClick={this.handleCountButtonClick} />
        <div id="result-wrapper">
          <ul className="list">
            {this.state.timeList.map(row => (
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

export default App;
