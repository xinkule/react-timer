import { extendObservable, action } from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      timeList: [],
      addItem: action(formatTime => {
        this.timeList.unshift({
          count: this.timeList.length + 1,
          time: formatTime
        });
      }),
      empty: action(() => {
        this.timeList = [];
      })
    });
  }
}

export default AppStore;
