import React, { Component } from 'react';
import './StartButton.css';

class StartButton extends Component {
  handleClick = () => {
    this.props.onStartButtonClick();
  };

  render() {
    const status = this.props.isRunning ? 'stop' : 'start';
    return (
      <span className={`btn Button-${status}`} onClick={this.handleClick}>
        {status}
      </span>
    );
  }
}

export default StartButton;
