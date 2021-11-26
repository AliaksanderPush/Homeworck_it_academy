'use strict';

import Model from "./Model.js";
import Controller from "./Controller.js";
import View from "./ClockViewCanvas.js";

function clock({ selector, timezone: tz }) {  
  const view = new View(selector, tz.string);
  const model = new Model(tz.number);
  const controller = new Controller(model, view);
}

clock({
  selector: document.getElementById('container'),
  timezone: {
    number: -5,
    string: 'Нью-Йорк (GMT-5)'
  }
});

clock({
  selector: document.getElementById('container'),
  timezone: {
    number: +1,
    string: 'Берлин (GMT+1)'
  }
});

