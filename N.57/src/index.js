'use strict';

import Model from "./Model";
import Controller from "./Controller";
import ClockViewCanvas from "./ClockViewCanvas";

function clock({ selector, timezone: tz }) {  
  const view = new ClockViewCanvas(selector, tz.string);
  const model = new Model(tz.number);
  const controller = new Controller(model, view);
}

clock({
  selector: document.getElementById('root'),
  timezone: {
    number: -5,
    string: 'Нью-Йорк (GMT-5)'
  }
});

clock({
  selector: document.getElementById('root'),
  timezone: {
    number: -1,
    string: 'Берлин (GMT-1)'
  }
});

