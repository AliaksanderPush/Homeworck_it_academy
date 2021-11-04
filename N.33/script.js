

(function()   {
   const container = document.querySelector('.container'),
         clock = container.querySelector('.clock'),
         div = container.querySelector('.for_input'),
         btn = div.querySelector('.btn'),
         input = div.querySelector('.input'),
         hoursArrow = clock.querySelector('.hour'),     
         minutsArrow = clock.querySelector('.minut'),
         secondsArrow = clock.querySelector('.second'),
         electClock = clock.querySelector('#el_clock'); 
  
   const sizeNumber = radius => radius/4.5;// фун-я для расчета размера цифр взависимости от диаметра часов 
   const radiusNumber = (radius, sizeNumbers) => radius - sizeNumbers; // радиус окружности на которой распологаются кружки для цифр
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
   window.addEventListener('load', getTime);

   function hideInput() {
   let  diametrClock = +input.value; // диаметр циферблата(часов)
   if (!diametrClock || diametrClock > 800 || diametrClock < 200) {
    return  alert('Введите диаметр от 200 до 800 пикселей');
   }  
      div.classList.add('hide');
      const radiusClock = diametrClock / 2;  //для удобства расчета получим радиус циферблата
      clockBuild(radiusClock);
   }

   function clockBuild(radiusClock) {
      //Создаем циферблат
      const circle = document.createElement('div');
      circle.style.width = 2*radiusClock + 'px';
      circle.style.height = 2*radiusClock + 'px';
      circle.style.position = 'relative';
      circle.classList.add('baground_circle');
      
      // Создаем и размещаем кружки для цифр на циферблате
      for (let i = 1; i <= hour; i++) {
         const angle = angles(i);
         const sizeNumbers = sizeNumber(radiusClock);
         const radiusNumbers = radiusNumber(radiusClock, sizeNumbers);
         const numCenterX = numCenter(radiusClock,sizeNumbers);
         const numCenterY = numCenter(radiusClock,sizeNumbers);
         const numPosX = numCenterX - Math.cos(angle) * radiusNumbers;
         const numPosY = numCenterY + Math.sin(angle) * radiusNumbers;
         const numCircle = document.createElement('div');
         numCircle.style.width = sizeNumbers + 'px';
         numCircle.style.height = sizeNumbers + 'px';
         numCircle.style.position = 'absolute';
         numCircle.style.top = numPosX + 'px';
         numCircle.style.left = numPosY + 'px';
         numCircle.textContent = i;
         numCircle.style.lineHeight = sizeNumbers + "px"
         numCircle.style.fontSize = sizeNumbers / f1 + "px"
         numCircle.classList.add('numbers_circle');
         circle.append(numCircle);
         clock.append(circle);
         
      }

     // часовая стрелка
      const arroWigth  = arrowWigth(radiusClock);
      hoursArrow.style.width = arroWigth/k1 + 'px'; 
      hoursArrow.style.height = radiusClock/n3 + 'px'; 
      hoursArrow.style.position = 'absolute';
      hoursArrow.style.bottom = radiusClock +'px';
      hoursArrow.style.left = radiusClock - arroWigth / l1+ "px"
      hoursArrow.style.zIndex = '2';
      
      //минутная стрелка
      minutsArrow.style.width = arroWigth/k2 + 'px';
      minutsArrow.style.height = radiusClock/n2 + 'px';
      minutsArrow.style.position = 'absolute';
      minutsArrow.style.bottom = radiusClock +'px';
      minutsArrow.style.left = radiusClock - arroWigth / l2 + "px";
      minutsArrow.style.zIndex = '5';
      
      // секундная стрелка
      secondsArrow.style.width = arroWigth/k3 + 'px';
      secondsArrow.style.height = radiusClock/n1 + 'px';
      secondsArrow.style.position = 'absolute';
      secondsArrow.style.bottom = radiusClock +'px';
      secondsArrow.style.left = radiusClock - arroWigth / l3 + "px";
      secondsArrow.style.zIndex = '2';
     
      // электронные часы
      const sizeNumbers = sizeNumber(radiusClock);
    
      electClock.style.position = "absolute"; 
      electClock.style.left = radiusClock - radiusClock / l2 + "px"; 
      electClock.style.top = radiusClock / t1 + "px"; 
      electClock.style.width = radiusClock / k4 + "px"; 
      electClock.style.fontSize = sizeNumbers / f2 + "px"; 
      electClock.classList.remove('hide');
      electClock.classList.add('el_clock');
      electClock.style.zIndex = '3';
      
   }
   
   
     
        
   // Функция которая устанавливает текущее время
   function getTime() {
      const data = new Date();
      const hours = data.getHours()*degHour;
      const minuts = data.getMinutes()*deg;
      const second = data.getSeconds()*deg;

   electClock.textContent = data.toLocaleTimeString();
   console.log(electClock.textContent)
   
    hoursArrow.style.transform = `rotateZ(${hours + (minuts/hour)}deg)`; 
    minutsArrow.style.transform = `rotateZ(${minuts}deg)`;
    secondsArrow.style.transform = `rotateZ(${second}deg)`;
   }
   setInterval(getTime,1000);
        
  }());



  
 