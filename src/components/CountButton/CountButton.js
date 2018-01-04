import React, { Component } from 'react';
import './CountButton.css';

class CountButton extends Component {
  handleClick = () => {
    this.props.onCountButtonClick();
  };

  render() {
    return (
      <span
        className={`btn Button-${!this.props.isInit && 'count'}`}
        onClick={this.handleClick}
      >
        {this.props.isInit ? 'count' : this.props.isRunning ? 'count' : 'reset'}
      </span>
    );
  }
}

export default CountButton;
