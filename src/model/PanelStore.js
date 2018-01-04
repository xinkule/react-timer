import { extendObservable, action } from 'mobx';
import moment from 'moment';

const FORMAT = 'mm:ss.SS';
let animationId = null;

class PanelStore {
  constructor() {
    extendObservable(this, {
      isInit: true,
      isRunning: false,
      lastTime: moment('00:00.00', FORMAT),
      pastTime: moment('00:00.00', FORMAT),
      tempTime: null,
      get formatTime() {
        return this.pastTime.format(FORMAT);
      },
      startOrStop: action(() => {
        this.tempTime = moment();
        this.isRunning = !this.isRunning;
        this.isInit = false;

        if (this.isRunning) {
          animationId = window.requestAnimationFrame(this.timeLoop);
        } else {
          window.cancelAnimationFrame(animationId);
          this.lastTime = this.pastTime;
        }
      }),
      timeLoop: action(() => {
        const milliseconds = moment().diff(this.tempTime);
        this.pastTime = this.lastTime.clone().add(milliseconds, 'milliseconds');
        animationId = window.requestAnimationFrame(this.timeLoop);
      }),
      reset: action(() => {
        this.isInit = true;
        this.lastTime = moment('00:00.00', FORMAT);
        this.pastTime = moment('00:00.00', FORMAT);
        this.tempTime = null;
      })
    });
  }
}

export default PanelStore;
