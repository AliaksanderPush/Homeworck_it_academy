(function()   {
   const clock = document.querySelector('.clock'),
         div = document.querySelector('.for_input'),
         btn = div.querySelector('.btn'),
         input = div.querySelector('.input'),
         svg = document.querySelector('svg');  

   const electClock = document.createElementNS("http://www.w3.org/2000/svg",'text');       
   const hoursArrow = document.createElementNS("http://www.w3.org/2000/svg","line");
   const minutsArrow = document.createElementNS("http://www.w3.org/2000/svg","line");
   const secondsArrow = document.createElementNS("http://www.w3.org/2000/svg","line");
   
   const sizeNumber = radius => radius/4.5;// фун-я,для расчета размера цифр взависимости от диаметра часов 
   const radiusNumber = (radius, sizeNumbers) => radius - sizeNumbers; // радиус окружности на которой распологаютя кружки для цифр
   const arrowWigth = radius => radius/20; //фун-я которая считает толщину стрелок взависимости от диаметра часов 
   const angles = i => i / 12 * Math.PI * 2; // функция дя расчета угла в радианах 
   const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
         hour = 12, // кол-во часов
         degHour = 30; // угол поворота часовой стрелки в час в градусах
   const k1 = 0.8, // коэффициенты отвечающие за ширину стрелок часов
         k2 = 0.4,
         k3 = 0.2,
         k4 = 2;
   const n1 = 1.8, // коэффициенты отвечающие за высоту стрелок часов
         n2 = 3;   
      
   const f1 = 1.5, // коэффициенты размеров шрифта  
         f2 = 1.1 
         
   btn.addEventListener('click', hideInput);   
   window.addEventListener('load', getTime);
  
   function hideInput() {
   let  diametrClock = +input.value; // диаметр циферблата(часов)
   if (!diametrClock || diametrClock > 800 || diametrClock < 200) {
    return  alert('Введите диаметр от 200 до 800 пикселей');
   }  
      div.classList.add('hide');

      svg.setAttribute("width", diametrClock);
      svg.setAttribute("height", diametrClock); 

      const radiusClock = diametrClock / 2;//для удобства расчета получим радиус циферблата
      clockBuild(radiusClock);
   }

   function clockBuild(radiusClock) {
      //Создаем циферблат
      const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
      circle.setAttribute("cx", radiusClock);
      circle.setAttribute("cy", radiusClock);
      circle.setAttribute("r", radiusClock);
      circle.setAttribute("fill", "#e2c41a");
      clock.append(circle);
      
      
      // Создаем и размещаем кружки для цифр и цифры на циферблате
      for (let i = 1; i <= hour; i++) {
         const angle = angles(i);
         const sizeNumbers = sizeNumber(radiusClock);
         const radiusNumbers = radiusNumber(radiusClock, sizeNumbers);
         const numCenterX = radiusClock; 
         const numCenterY = radiusClock; 
         const numPosY = numCenterY - Math.cos(angle) * radiusNumbers;
         const numPosX = numCenterX + Math.sin(angle) * radiusNumbers;
                
         const numCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
         numCircle.setAttribute("cx", numPosX);
         numCircle.setAttribute("cy", numPosY);
         numCircle.setAttribute("r", sizeNumbers/2);
         numCircle.setAttribute("fill", "#48B382");
         svg.append(numCircle);
             
         const text = document.createElementNS("http://www.w3.org/2000/svg","text");
         text.textContent=i;
         text.setAttribute("x", numPosX);
         text.setAttribute("y", numPosY);
         text.setAttribute("text-anchor", "middle");
         text.setAttribute("dominant-baseline", "central");
         text.setAttribute("text", 0.5);
         text.style.fontSize = sizeNumbers / f1 + "px";
         clock.append(text);
            
         
      }
      
     // часовая стрелка
      const arroWidth  = arrowWigth(radiusClock);
      
      hoursArrow.setAttribute("x1", radiusClock);
      hoursArrow.setAttribute("y1", radiusClock);
      hoursArrow.setAttribute("x2", radiusClock);
      hoursArrow.setAttribute("y2", radiusClock/n1);
      hoursArrow.setAttribute("stroke", "black");
      hoursArrow.setAttribute("stroke-width", arroWidth*k1);
      hoursArrow.setAttribute("stroke-linecap", "round");
      clock.append(hoursArrow);
        
      //минутная стрелка
      minutsArrow.setAttribute("stroke", "black");
      minutsArrow.setAttribute("stroke-width", arroWidth/k4);
      minutsArrow.setAttribute("x1", radiusClock);
      minutsArrow.setAttribute("y1", radiusClock);
      minutsArrow.setAttribute("x2", radiusClock);
      minutsArrow.setAttribute("y2", radiusClock*k2);
      minutsArrow.setAttribute("stroke-linecap", "round");
      clock.append(minutsArrow);
      
      // секундная стрелка
      secondsArrow.setAttribute("x1", radiusClock);
      secondsArrow.setAttribute("y1", radiusClock);
      secondsArrow.setAttribute("x2", radiusClock);
      secondsArrow.setAttribute("y2", radiusClock*k3);
      secondsArrow.setAttribute("stroke", "black");
      secondsArrow.setAttribute("stroke-width", arroWidth/n2);
      secondsArrow.setAttribute("stroke-linecap", "round");
      clock.append(secondsArrow);
     
      // электронные часы
      const sizeNumbers = sizeNumber(radiusClock);
      electClock.setAttribute("stroke","black");
      electClock.setAttribute("x",radiusClock);
      electClock.setAttribute("y",radiusClock/2 + sizeNumbers);
      electClock.setAttribute("text-anchor","middle");
      electClock.setAttribute("stroke-opacity", 0.1);
      electClock.style.fontSize = sizeNumbers / f2 + "px"
      clock.append(electClock);

    // определяем точку трансформации стрелок часов, минут, секунд по оси X и Y
      hoursArrow.style.transformOrigin = `center ${radiusClock}px`;
      minutsArrow.style.transformOrigin = `center ${radiusClock}px`;
      secondsArrow.style.transformOrigin = `center ${radiusClock}px`;
       
   }
   
         
   // Функция которая устанавливает текущее время
   function getTime() {
      const data = new Date();
      const hours = data.getHours()*degHour;
      const minuts = data.getMinutes()*deg;
      const second = data.getSeconds()*deg;

    electClock.textContent = data.toLocaleTimeString();
    console.log(electClock.textContent);

    hoursArrow.style.transform = `rotateZ(${hours + (minuts/hour)}deg)`; 
    minutsArrow.style.transform = `rotateZ(${minuts}deg)`;
    secondsArrow.style.transform = `rotateZ(${second}deg)`;
    
   }   
   setInterval(getTime,1000);
  }());
