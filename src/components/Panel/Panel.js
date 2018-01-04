import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Panel.css';
import CountButton from '../CountButton/CountButton';
import StartButton from '../StartButton/StartButton';
import PanelStore from '../../model/PanelStore';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.store = new PanelStore();
  }

  handleStartButtonClick = () => {
    this.store.startOrStop();
  };

  handleCountButtonClick = () => {
    if (!this.store.isInit) {
      if (!this.store.isRunning) {
        this.store.reset();
      }
      // push current time
      this.props.onCountButtonClick(this.store.isRunning, this.store.pastTime);
    }
  };

  render() {
    return (
      <div className="Panel">
        <div className="Panel-time-wrapper">
          <span className="Panel-time">{this.store.formatTime}</span>
        </div>
        <div className="Panel-btn">
          <CountButton
            isInit={this.store.isInit}
            isRunning={this.store.isRunning}
            onCountButtonClick={this.handleCountButtonClick}
          />
          <StartButton
            isRunning={this.store.isRunning}
            onStartButtonClick={this.handleStartButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default observer(Panel);
