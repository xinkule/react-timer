import React, { Component } from 'react';
import './StartButton.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onStartButtonClick();
  }

  render() {
    const status = this.props.isRunning ? 'stop' : 'start';
    return (
      <span className={`btn Button-${status}`} onClick={this.handleClick}>
        {status}
      </span>
    );
  }
}

export default Button;
