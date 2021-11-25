'use strict';

import {clockWidth, clockHeight, clockX, clockY, radiusClock} from './Clock.js';
 
export default class View {

    constructor(selector, city) {
        this.selector = selector;
        this.city = city;

        const wrap = document.createElement('div');

        const canvas = document.createElement('canvas');
        canvas.width = clockWidth;
        canvas.height = clockHeight;
        
        const start = document.createElement('button');
        start.textContent = 'старт';
        start.addEventListener('click', () => this.start(true));

        const stop = document.createElement('button');
        stop.textContent = 'стоп';
        stop.addEventListener('click', () => this.start(false));

        const citys = document.createElement('span');
        city.textContent = this.citys;

        this.selector.appendChild(wrap).append(start, stop, city, canvas);

        this.ctx = canvas.getContext('2d');
    }

    clearRect(x, y, width, height) {
        this.ctx.clearRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawText(x, y, text, color) {
        this.ctx.font = '40px serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawLine(xFrom, yFrom, xTo, yTo, width, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(xFrom, yFrom);
        this.ctx.lineTo(xTo, yTo);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    render(model) {
        this.clearRect(0, 0, clockWidth, clockHeight);

        this.drawCircle(clockX, clockY, radiusClock, 'gold');

        for (let i = 1; i <= 12; i++) {
            this.drawCircle(
                model.xFrom(i),
                model.yFrom(i),
                30,
                'rgb(219, 165, 15)'
            );

            this.drawText(
                model.xfrom(i),
                model.yfrom(i),
                i,
                'black'
            );
        }

        this.drawText(
            clockX,
            clockY - clockHeight / 5,
            `${model.formaTime(model.date.getHours())}:${model.formaTime(model.date.getMinutes())}:${model.correctTime(model.date.getSeconds())}`,
            'black',
        );

        this.drawLine(
            clockX,
            clockY,
            model.xTo(model.date.getHours(), 12, clockX, 150),
            model.yTo(model.date.getHours(), 12, clockY, 150),
            10,
            '#333'
        );

        this.drawCircle(clockX, clockY, 10, '#333');

        this.drawLine(
            clockX,
            clockY,
            model.xto(model.date.getMinutes(), 60, clockX, 170),
            model.yto(model.date.getMinutes(), 60, clockY, 170),
            5,
            '#607d8b'
        );

        this.drawCircle(clockX, clockY, 8, '#607d8b');

        this.drawLine(
            clockX,
            clockY,
            model.xto(model.date.getSeconds(), 60, clockX, 200),
            model.yto(model.date.getSeconds(), 60, clockY, 200),
            3,
            'red'
        );

        this.drawCircle(clockX, clockY, 5, 'red');
    }

    setChange(handler) {
        this.start = handler;
    }
}


