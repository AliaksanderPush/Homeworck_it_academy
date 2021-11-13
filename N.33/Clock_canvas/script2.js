(function()   {
   const wrap = document.getElementById("clock"),
         clock = wrap.getContext("2d");
         container = document.querySelector('.container'),
         div = container.querySelector('.for_input'),
         btn = div.querySelector('.btn'),
         input = div.querySelector('.input');
   

   const getPositionX = (arrow, lengthArrow) => lengthArrow * Math.sin(arrow/180*Math.PI);
   const getPositionY = (arrow, lengthArrow) => lengthArrow * Math.cos(arrow / 180 * Math.PI);
   const sizeNumber = radius => radius/7;// фун-я для расчета размера цифр взависимости от диаметра часов 
   const radiusNumber = (radius, sizeNumbers) => radius - 1.2*sizeNumbers; // радиус окружности на которой распологаются кружки для цифр
   const arrowWigth = radius => radius/20; //фун-я которая считает толщину стрелок взависимости от диаметра часов 
   const angles = i => i / 12 * Math.PI * 2; // функция дя расчета угла в радианах 
   const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
         hour = 12, // кол-во часов
         degHour = 30, // угол поворота часовой стрелки в час в градусах
         countMin = 60; // кол-во минут  (сек) в часе (минуте)
   const k1 = 2, // коэффициенты отвечающие за ширину стрелок часов
         k2 = 3,
         k3 = 7,
         n1 = 1.7, // коэффициенты отвечающие за высоту стрелок часов
         n2 = 1.3, 
         n3 = 1.1;    
   const f1 = 1.5; // поправоччный коэфф на размер  цифр 

   let radiusClock = 0;      
   btn.addEventListener('click', hideInput);   
  

   function hideInput() {
   let  diametrClock = +input.value; // диаметр циферблата(часов)
   if (!diametrClock || diametrClock > 800 || diametrClock < 200) {
    return  alert('Введите диаметр от 200 до 800 пикселей');
   }  
      div.classList.add('hide');
      wrap.setAttribute("width", diametrClock);
      wrap.setAttribute("height", diametrClock);
      radiusClock = diametrClock / 2;  //для удобства расчета получим радиус циферблата
      clockBuild();
   }

   function clockBuild() {
         const clockX = wrap.offsetWidth / 2,
               clockY = wrap.offsetHeight / 2,
               numbersCenterX = radiusClock,
               numbersCenterY = radiusClock;
         const sizeNumbers = sizeNumber(radiusClock);
         const radiusNumbers = radiusNumber(radiusClock, sizeNumbers);
         const arroWigth  = arrowWigth(radiusClock); 
         const {hours, minuts, second, electClock} = getTime();

      //Создаем циферблат
      clock.beginPath(); 
      clock.fillStyle = "rgb(219, 165, 15)"; 
      clock.arc(clockX, clockY, radiusClock, 0,Math.PI*2, false); 
      clock.lineWidth = 2;
      clock.fill(); 
      clock.closePath(); 

      // Создаем и размещаем кружки и цифры на циферблате
      for (let i = 1; i <= hour; i++) {
         const angle = angles(i);
         const numPosX = numbersCenterX + Math.sin(angle) * radiusNumbers;
         const numPosY = numbersCenterY - Math.cos(angle) * radiusNumbers;
        
         clock.beginPath();
         clock.arc(numPosX, numPosY, sizeNumbers, 0, 2 * Math.PI, false);
         clock.fillStyle = "cadetblue";
         clock.fill();
         clock.fillStyle = "black";
         clock.font =`${sizeNumbers*f1}px serif `;
         clock.textAlign = "center";
         clock.textBaseline = "middle";
         clock.fillText(i,numPosX, numPosY); 
            
      }

     // часовая стрелка
      const hourLength = radiusClock/n1;
      let hx = getPositionX(hours, hourLength);
      let hy = getPositionY(hours, hourLength);
      clock.beginPath();
      clock.lineCap = "round";
      clock.strokeStyle = "black";
      clock.moveTo(clockX, clockY);
      clock.lineTo(clockX + hx, clockY - hy);
      clock.lineWidth = arroWigth / k1;
      clock.stroke();
      clock.closePath();
      
      
      //минутная стрелка
      const minuteLength = radiusClock/n2;
      let mx = getPositionX(minuts, minuteLength);
      let my = getPositionY(minuts, minuteLength);
      clock.beginPath();
      clock.lineCap = "round";
      clock.strokeStyle = "black";
      clock.moveTo(clockX, clockY);
      clock.lineTo(clockX + mx, clockY - my);
      clock.lineWidth = arroWigth / k2 ;
      clock.stroke();
      clock.closePath();
     
      
      // секундная стрелка
      const secondLength = radiusClock / n3;
      let sx = getPositionX(second, secondLength);
      let sy = getPositionY(second, secondLength);
      clock.beginPath();
      clock.lineCap = "round";
      clock.strokeStyle = "black";
      clock.moveTo(clockX, clockY); 
      clock.lineTo(clockX + sx, clockY - sy); //рисуем линию из текущей точки в указанную, и затем делает эту точку текущей
      clock.lineWidth = arroWigth / k3;
      clock.stroke();
      clock.closePath();
     
      // электронные часы
      clock.beginPath();
      clock.font = `${sizeNumbers*f1}px serif`;
      clock.textBaseline = "middle";
      clock.fillText(electClock, clockX, clockY - radiusClock/2);
      clock.fill();
      clock.closePath();
      
   }
  
    
       
   // Функция которая устанавливает текущее время
   function getTime() {
      const data = new Date();
      const hours =  degHour * (data.getHours() + (1 / countMin) * data.getMinutes());
      const minuts = deg * (data.getMinutes() + (1 / countMin) * data.getSeconds());
      const second = deg * data.getSeconds();
      const electClock = data.toLocaleTimeString();
      
    return {
        hours,
        minuts,
        second,
        electClock
      };
      
   }
   setInterval(clockBuild,1000);
      
  }());



  
 