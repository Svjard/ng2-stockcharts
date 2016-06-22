import d3 from 'd3';
import { noop, identity } from './index';

export default class AccumulatingWindow {
  static accumulateTill: any = d3.functor(false);
  static accumulator: any = noop;
  static value: any = identity;

  static init(data) {
    let accumulatedWindow = [];
    let response = [];
    let accumulatorIdx = 0;
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      // console.log(d, accumulateTill(d));
      if (accumulateTill(d)) {
        if (accumulatedWindow.length > 0) response.push(accumulator(accumulatedWindow, i, accumulatorIdx++));
        accumulatedWindow = [value(d)];
      } else {
        accumulatedWindow.push(value(d));
      }
    }
    return response;
  }

  static accumulateTill(x: any): AccumulatingWindow {
    if (!arguments.length) {
      return this.accumulateTill;
    }
    this.accumulateTill = d3.functor(x);
    return this;
  }

  static accumulator(x: any): AccumulatingWindow {
    if (!arguments.length) {
      return this.accumulator;
    }
    this.accumulator = x;
    return this;
  }

  static value(x: boolean): AccumulatingWindow {
    if (!arguments.length) {
      return this.value;
    }
    this.value = x;
    return this;
  }
}

