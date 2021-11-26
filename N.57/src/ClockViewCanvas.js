'use strict';

import {clockWidth, clockHeight, clockX, clockY, radiusClock} from './Model.js';
 
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
        start.style.marginLeft = '10px';
        start.addEventListener('click', () => this.start(true));

        const stop = document.createElement('button');
        stop.textContent = 'стоп';
        stop.style.marginLeft = '10px';
        stop.style.marginRight = '10px';
        stop.addEventListener('click', () => this.start(false));

        const citys = document.createElement('span');
        citys.textContent = this.citys;
        

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
        this.ctx.strokeStyle = 'rgb(219, 165, 15)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawText(x, y, text, color) {
        this.ctx.font = '30px serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawLine(xFrom, yFrom, xTo, yTo, width, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(xFrom, yFrom);
        this.ctx.lineTo(xTo, yTo);
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    render(model) {
        this.clearRect(0, 0, clockWidth, clockHeight);

        this.drawCircle(clockX, clockY, radiusClock, 'rgb(219, 165, 15)');

        for (let i = 1; i <= 12; i++) {
            this.drawCircle(
                model.xFrom(i),
                model.yFrom(i),
                20,
                'cadetblue'
            );

            this.drawText(
                model.xFrom(i),
                model.yFrom(i),
                i,
                'black'
            );
        }

        this.drawText(
            clockX,
            clockY - clockHeight / 5,
            `${model.correctTime(model.date.getHours())}:${model.correctTime(model.date.getMinutes())}:${model.correctTime(model.date.getSeconds())}`,
            'black',
        );

        this.drawLine(
            clockX,
            clockY,
            model.xTo(model.date.getHours(), 60, clockX, 70),
            model.yTo(model.date.getHours(), 60, clockY, 70),
            8,
            'black'
        );

      

        this.drawLine(
            clockX,
            clockY,
            model.xTo(model.date.getMinutes(), 60, clockX, 100),
            model.yTo(model.date.getMinutes(), 60, clockY, 100),
            5,
            'black'
        );

    

        this.drawLine(
            clockX,
            clockY,
            model.xTo(model.date.getSeconds(), 60, clockX, 130),
            model.yTo(model.date.getSeconds(), 60, clockY, 130),
            3,
            'black'
        );

     
    }

    setChange(handler) {
        this.start = handler;
    }
}


