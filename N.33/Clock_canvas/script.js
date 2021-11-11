(function()   {
      const clock = document.getElementById('clock'),
            ctx = clock.getContext('2d'),
            container = document.querySelector('.container'),
            div = container.querySelector('.for_input'),
            btn = div.querySelector('.btn'),
            input = div.querySelector('.input'),
            canvas = document.querySelector('canvas');   
        let centerX,
            centerY;
          //  radius = centerX < centerY ? centerX*0.95 : centerY*0.95; 
     
      const sizeNumber = radius => radius/4.5;// фун-я для расчета размера цифр взависимости от диаметра часов 
      const radiusNumber = (radius, sizeNumbers) => radius - sizeNumbers; // радиус окружности на которой распологаются кружки для цифр
      const arrowWigth = radius => radius/20; //фун-я которая считает толщину стрелок взависимости от диаметра часов 
      const numCenter = (radius, sizeNumbers) => radius - sizeNumbers/2; //фун-я определяет положение кружка на цифеблате по координатам 
      const angle = i => i / 12 * Math.PI * 2; // функция дя расчета угла в радианах 
      const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
            hour = 12, // кол-во часов
            degHour = 30; // угол поворота часовой стрелки в час в градусах
      const k1 = 1.5, // коэффициенты отвечающие за ширину стрелок часов
            k2 = 4,
            k3 = 8,
            k4 = 2;
      const n1 = 1.2, // коэффициенты отвечающие за высоту стрелок часов
            n2 = 1.5, 
            n3 = 2;    
      const l1 = 2, // поправочные коэффициенты по координатам Х
            l2 = 4,
            l3 = 6;
      const t1 = 2.5; // поправочны коэф на координату У  
      const f1 = 1.5, // коэффициенты размеров шрифта
            f2 = 1.1;
      btn.addEventListener('click', hideInput);   
     // window.addEventListener('load', getTime);
   
      function hideInput() {
      let  diametrClock = +input.value; // диаметр циферблата(часов)
      if (!diametrClock || diametrClock > 800 || diametrClock < 200) {
       return  alert('Введите диаметр от 200 до 800 пикселей');
      }  
         div.classList.add('hide');
         canvas.setAttribute("width", diametrClock);
         canvas.setAttribute("height", diametrClock); 
         const radiusClock = diametrClock / 2;  //для удобства расчета получим радиус циферблата
         centerX = radiusClock;
         centerY = radiusClock;
         clockBuild(radiusClock);
      }
   
      function clockBuild(radius) {
         //Создаем циферблат
         ctx.fillStyle = 'rgb(219, 165, 15)';
         ctx.lineWidth = arrowWigth(radius);
         ctx.beginPath();
         ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
         ctx.fill();
         const sizeNumbers = sizeNumber(radius);
         const radiusNumbers = radiusNumber(radius, sizeNumbers);
         let angle = 0;	//угол поворота метки
         ctx.fillStyle = 'cadetblue';
         for(let i = 0; i < 12; i++) {
               let markX = centerX + radiusNumbers*Math.sin(angle);
               let markY = centerY + radiusNumbers*Math.cos(angle);
               ctx.beginPath();
               ctx.arc(markX,markY,radius/10,0,Math.PI*2,true);
               ctx.fill();
               angle += 30*Math.PI/180;
         }
      } 
      
      
    function drawArrow(radius,tSec, tMin, tHour) {
      ctx.lineCap = 'round';
      let secShift = radius/4;
      let minShift = radius/9;
      let hourShift = radius/2.3;

        // часовая стрелка

      ctx.strokeStyle = 'rgba(10,10,10,0.9)';
      ctx.lineWidth = radius/15;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      let hourTipX = centerX + (radius - hourShift)*Math.cos(tHour);
      let hourTipY = centerY + (radius - hourShift)*Math.sin(tHour);
      ctx.lineTo(hourTipX, hourTipY);
      ctx.stroke();
         //минутная стрелка
      ctx.strokeStyle = 'rgba(10,10,10,0.9)';
      ctx.lineWidth = radius/25;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      let minTipX = centerX + (radius - minShift)*Math.cos(tMin);
      let minTipY = centerY + (radius - minShift)*Math.sin(tMin);
      ctx.lineTo(minTipX, minTipY);
      ctx.stroke();
      
         // секундная стрелка
      ctx.strokeStyle = 'red';
      ctx.lineWidth = radius/50;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      let secTipX = centerX + (radius - secShift)*Math.cos(tSec);
      let secTipY = centerY + (radius - secShift)*Math.sin(tSec);
      ctx.lineTo(secTipX, secTipY);
      ctx.stroke();
      
    }    

     

// Функция которая устанавливает текущее время      
setInterval(function(){
      var d = new Date();
      let tSec = (6*d.getSeconds()-90)*Math.PI/180;  //Определяем угол для секунд
      let tMin = (6*(d.getMinutes() + (1/60)*d.getSeconds())-90)*Math.PI/180; //Определяем угол для минут
      let tHour = (30*(d.getHours() + (1/60)*d.getMinutes())-90)*Math.PI/180;  //Определяем угол для часов
      ctx.clearRect(0,0,clock.width,clock.height);
      drawArrow(radius,tSec, tMin, tHour);
}, 1000); 


})();