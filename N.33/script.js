'use strict'

   const container = document.querySelector('.container'),
         clock = document.querySelector('.clock'),
         div = container.querySelector('.for_input'),
         btn = div.querySelector('.btn'),
         input = div.querySelector('.input'),
         hoursArrow = clock.querySelector('.hour'),     
         minutsArrow = clock.querySelector('.minut'),
         secondsArrow = clock.querySelector('.second'),
         electClock = clock.querySelector('.el_clock');
  
   const sizeNumber = radius => radius/4.5;// фун-я,которая возвращает размер цифр взависимости от диаметра часов 
   const radiusNumber = (radius, sizeNumbers) => radius - sizeNumbers; // диаметр окружности на которой распологаютя кружки для цифр
   const arrowWigth = radius => radius/20; //фун-я которая считает толщину стрелок взависимости от диаметра часов 
   const numCenter = (radius, sizeNumbers) => radius - sizeNumbers/2; //фун-я определяет положение кружка на цифеблате по координатам   
   const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
         hour = 12, // кол-во часов
         degHour = 30; // угол поворота часовой стрелки в час в градусах
       
     
   btn.addEventListener('click', hideInput);   
   window.addEventListener('load', getTime);

   function hideInput() {
   const  radiusClock = input.value / 2; // диаметр циферблата(часов)
   if (!radiusClock || radiusClock > 800 || radiusClock < 200) {
    return  alert('Введите диаметр от 200 до 800 пикселей');
   }  
      div.classList.add('hide');
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
      for (let i = 1; i<=hour; i++) {
         const angle = i / 12 * Math.PI * 2;
         const sizeNumbers = sizeNumber(radiusClock);
         const radiusNumbers = radiusNumber(radiusClock, sizeNumbers);
         const numCenterX = numCenter(radiusClock,sizeNumbers);
         const numCenterY = numCenter(radiusClock,sizeNumbers);
         const numPosX = numCenterX - Math.cos(angle) * radiusNumbers;
         const numPosY = numCenterY - Math.sin(angle) * radiusNumbers;
         const numCircle = document.createElement('div');
         numCircle.style.width = sizeNumbers + 'px';
         numCircle.style.height = sizeNumbers + 'px';
         numCircle.style.position = 'absolute';
         numCircle.style.top = numPosX + 'px';
         numCircle.style.left = numPosY + 'px';
         numCircle.textContent = i;
         numCircle.classList.add('block_numbers');
         numCircle.style.lineHeight = sizeNumbers + "px"
         numCircle.style.fontSize = sizeNumbers / 1.5 + "px"
         numCircle.classList.add('numbers_circle');
         circle.append(numCircle);
         clock.append(circle);
         
      }

     
      const arroWigth  = arrowWigth(radiusClock);
      hoursArrow.style.width = arroWigth/1.5 + 'px'; 
      hoursArrow.style.height = radiusClock/2 + 'px'; 
      hoursArrow.style.position = 'absolute';
      hoursArrow.style.bottom = radiusClock +'px';
      hoursArrow.style.left = radiusClock - arroWigth / 2 + "px"
      hoursArrow.style.zIndex = '2';
      
      
      minutsArrow.style.width = arroWigth/4 + 'px';
      minutsArrow.style.height = radiusClock/1.5 + 'px';
      minutsArrow.style.position = 'absolute';
      minutsArrow.style.bottom = radiusClock +'px';
      minutsArrow.style.left = radiusClock - arroWigth / 4 + "px";
      minutsArrow.style.zIndex = '5';
      
      
      secondsArrow.style.width = arroWigth/8 + 'px';
      secondsArrow.style.height = radiusClock/1.2 + 'px';
      secondsArrow.style.position = 'absolute';
      secondsArrow.style.bottom = radiusClock +'px';
      secondsArrow.style.left = radiusClock - arroWigth / 6 + "px";
      secondsArrow.style.zIndex = '2';

      const sizeNumbers = sizeNumber(radiusClock);
      electClock.style.position = "absolute"; //позиционируем электронные часы
      electClock.style.left = radiusClock - radiusClock / 4 + "px"; 
      electClock.style.top = radiusClock / 2.5 + "px"; 
      electClock.style.width = radiusClock / 2 + "px"; 
      electClock.style.fontSize = sizeNumbers / 2 + "px"; 
      electClock.style.zIndex = '3';
      
   }
   
   
     
        
   // Функция которая устанавливает текущее время
   function getTime() {
      const data = new Date();
      const hours = data.getHours()*degHour;
      const minuts = data.getMinutes()*deg;
      const second = data.getSeconds()*deg;

    electClock.textContent = data.toLocaleTimeString();

    hoursArrow.style.transform = `rotateZ(${hours + (minuts/hour)}deg)`; 
    minutsArrow.style.transform = `rotateZ(${minuts}deg)`;
    secondsArrow.style.transform = `rotateZ(${second}deg)`;
    setInterval(getTime);
   }   

  



  
 