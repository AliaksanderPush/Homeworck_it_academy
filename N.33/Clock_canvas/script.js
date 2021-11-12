(function()   {
      const wrap = document.getElementById("clock"),
            clock = wrap.getContext("2d");
            container = document.querySelector('.container'),
            div = container.querySelector('.for_input'),
            btn = div.querySelector('.btn'),
            input = div.querySelector('.input');
     
     
      const sizeNumber = radius => radius/7;// фун-я для расчета размера цифр взависимости от диаметра часов 
      const radiusNumber = (radius, sizeNumbers) => radius - sizeNumbers*1.2; // радиус окружности на которой распологаются кружки для цифр
      const arrowWigth = radius => radius/20; //фун-я которая считает толщину стрелок взависимости от диаметра часов 
      const numCenter = (radius, sizeNumbers) => radius - sizeNumbers/2; //фун-я определяет положение кружка на цифеблате по координатам 
      const angles = i => i / 12 * Math.PI * 2; // функция дя расчета угла в радианах 
      const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
            hour = 12, // кол-во часов
            degHour = 30; // угол поворота часовой стрелки в час в градусах
      const k1 = 1.5, // коэффициенты отвечающие за ширину стрелок часов
            k2 = 4,
            k3 = 8,
            k4 = 2;
      const n1 = 3, // коэффициенты отвечающие за высоту стрелок часов
            n2 = 1.5; 
            n3 = 4; 
      const l1 = 2, // поправочные коэффициенты по координатам Х
            l2 = 4,
            l3 = 6;
      const t1 = 2.5; // поправочны коэф на координату У  
      const f1 = 1.2, // коэффициенты размеров шрифта
            f2 = 1.1;
      btn.addEventListener('click', hideInput);   
    
      function hideInput() {
      let  diametrClock = +input.value; // диаметр циферблата(часов)
      if (!diametrClock || diametrClock > 800 || diametrClock < 200) {
           return  alert('Введите диаметр от 200 до 800 пикселей');
      }  
         div.classList.add('hide');
         wrap.setAttribute("width", diametrClock);
         wrap.setAttribute("height", diametrClock); 
         const radiusClock = diametrClock / 2;  //для удобства расчета получим радиус циферблата
         updateArrows (radiusClock);
         
      }
      function updateArrows(radiusClock) {
           
      const sizeNumbers = sizeNumber(radiusClock),//размер цифр
            clockX = wrap.offsetWidth / 2,
            clockY = wrap.offsetHeight / 2,
            arrowWidth = arrowWigth(radiusClock),
            r = radiusNumber(radiusClock, sizeNumbers), //позиционируем кружки часов относительно циферблата
            numbersCenterX = radiusClock,
            numbersCenterY = radiusClock;
            
        
        //циферблат
            clock.beginPath(); 
            clock.fillStyle = "#fce38a"; 
            clock.arc(clockX, clockY, radiusClock, 0,Math.PI*2, false); 
            clock.lineWidth = 2;
            clock.fill(); 
            clock.closePath(); 
             
      for (let i = 1; i <= 12; i++) {
            let angle = angles(i);
            const nx = numbersCenterX + Math.sin(angle) * r;
            const ny = numbersCenterY - Math.cos(angle) * r;
      
            clock.beginPath();
            clock.arc(nx, ny, sizeNumbers, 0, 2 * Math.PI, false);
            clock.fillStyle = "#48B382";
            clock.fill();
      
            clock.fillStyle = "black";
            clock.font =`${sizeNumbers*f1}px serif `;
            clock.textAlign = "center";
            clock.textBaseline = "middle";
            clock.fillText(i,nx, ny); 
      }
        
        //цифровые часы
            const time = new Date ();
            const currTime = time.toLocaleTimeString();
            clock.beginPath();
            clock.font = `${sizeNumbers*f1}px serif`;
            clock.textBaseline = "middle";
            clock.fillText(currTime, clockX, clockY - radiusClock/2);
            clock.fill();
            clock.closePath();
        
        // секундная стрелка
            const secondAngular = deg * time.getSeconds();
            console.log(secondAngular);
            const secondLength = radiusClock - n2*sizeNumbers;
            clock.beginPath();
            clock.lineCap = "round";
            clock.strokeStyle = "black";
            clock.moveTo(clockX, clockY); 
            clock.lineTo(clockX + secondLength * Math.sin(secondAngular/180*Math.PI), clockY - secondLength * Math.cos(secondAngular / 180 * Math.PI)); //рисуем линию из текущей точки в указанную, и затем делает эту точку текущей
            clock.lineWidth = arrowWidth / k3;
            clock.stroke();
            clock.closePath();
        
        // минутная стрелка
            const minuteAngular = deg * (time.getMinutes() + (1 / 60) * time.getSeconds());
            console.log(minuteAngular);
            const minuteLength = radiusClock - n1*sizeNumbers;
            clock.beginPath();
            clock.lineCap = "round";
            clock.strokeStyle = "black";
            clock.moveTo(clockX, clockY);
            clock.lineTo(clockX + minuteLength * Math.sin(minuteAngular/180*Math.PI), clockY - minuteLength * Math.cos(minuteAngular / 180 * Math.PI));
            clock.lineWidth = arrowWidth / k2 ;
            clock.stroke();
            clock.closePath();
        
        // часовая стрелка
            const hourAngular = degHour * (time.getHours() + (1 / 60) * time.getMinutes());
            console.log(hourAngular);
            const hourLength = radiusClock - n2*sizeNumbers;;
            clock.beginPath();
            clock.lineCap = "round";
            clock.strokeStyle = "black";
            clock.moveTo(clockX, clockY);
            clock.lineTo(clockX + hourLength * Math.sin(hourAngular/180*Math.PI), clockY - hourLength * Math.cos(hourAngular / 180 * Math.PI));
            clock.lineWidth = arrowWidth / k4;
            clock.stroke();
            clock.closePath();
        
            setTimeout(updateArrows, 1020 - time.getMilliseconds());
        }
        
     

})();