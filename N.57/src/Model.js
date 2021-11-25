
'use strict';

export const clockWidth = 500;
export const clockHeight = 500;
export const clockX = clockWidth / 2;
export const clockY = clockHeight / 2;
export const radiusClock = (clockWidth / 2) - 1;

export default class Model {

    constructor(timezone) {
        this.timezone = timezone;
        this.date = this.getDate();
        
        setInterval(() => {
            this.date = this.getDate();
            this.changeListenerCallback();
        }, 1000);
    }

    setListener(changeListener) {
        this.changeListenerCallback = changeListener;
    }

    getDate() {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 6e4);
        const date = new Date(utc + (36e5 * this.timezone));
        return date;
    }

    xFrom(index) {
        return clockX + (radiusClock - clockWidth / 10) * Math.sin((index * 30) * Math.PI / 180);
    }

    yFrom(index) {
        return clockY - (radiusClock - clockHeight / 10) * Math.cos((index * 30) * Math.PI / 180);
    }

    xTo(n, i, x, radius) {
        return x + radius * Math.sin(2 * Math.PI * n / i);
    }

    yTo(n, i, y, radius) {
        return y - radius * Math.cos(2 * Math.PI * n / i);
    }

    correctTime(time) {
        return time < 10 ? time = `0${time}` : time;
    }
}


