import React, { Component } from 'react';
import './Panel.css';
import CountButton from '../CountButton/CountButton';
import StartButton from '../StartButton/StartButton';
import moment from 'moment';

const FORMAT = 'mm:ss.SS';
// used for animation loop
let animationId = null;

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInit: true,
      isRunning: false,
      lastTime: moment('00:00.00', FORMAT),
      pastTime: moment('00:00.00', FORMAT),
      tempTime: null,
    };

    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleCountButtonClick = this.handleCountButtonClick.bind(this);
  }

  handleStartButtonClick() {
    this.setState(prevState => ({
      tempTime: moment(),
      isRunning: !prevState.isRunning,
      isInit: false,
    }), () => {
      // start or cancle animation
      if (this.state.isRunning) {
        animationId = window.requestAnimationFrame(this.timeLoop.bind(this));
      } else {
        window.cancelAnimationFrame(animationId);
        this.setState({
          lastTime: this.state.pastTime,
        });
      }
    });
  }

  handleCountButtonClick() {
    if (!this.state.isInit) {
      if (!this.state.isRunning) {
        this.setState({
          isInit: true,
          lastTime: moment('00:00.00', FORMAT),
          pastTime: moment('00:00.00', FORMAT),
          tempTime: null,
        });
      }
      // push current time
      this.props.onCountButtonClick(this.state.isRunning, this.state.pastTime);
    }
  }

  timeLoop() {
    // calculate passed time from a specific moment
    const milliseconds = moment().diff(this.state.tempTime);
    this.setState({
      pastTime: this.state.lastTime.clone().add(milliseconds, 'milliseconds'),
    });

    if (this.state.isRunning) {
      animationId = window.requestAnimationFrame(this.timeLoop.bind(this));
    }
  }

  render() {
    const formatTime = this.state.pastTime.format(FORMAT);

    return (
      <div className="Panel">
        <div className="Panel-time-wrapper">
          <span className="Panel-time">{formatTime}</span>
        </div>
        <div className="Panel-btn">
          <CountButton
            isInit={this.state.isInit}
            isRunning={this.state.isRunning}
            onCountButtonClick={this.handleCountButtonClick}
          />
          <StartButton
            isRunning={this.state.isRunning}
            onStartButtonClick={this.handleStartButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default Panel;
