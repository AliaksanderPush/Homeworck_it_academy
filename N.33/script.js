'use strict'
window.addEventListener('DOMContentLoaded', () => {
   const container = document.querySelector('.container'),
         div = container.querySelector('.for_input'),
         btn = div.querySelector('.btn'),
         input = div.querySelector('.input'),
         hoursArrow = container.querySelector('.hour'),
         secondsArrow = container.querySelector('.second');

   const deg = 6,// угол поворота сек/мин стрелки в сек/мин в градусах
         hour = 12, // кол-во часов
         degHour = 30; // угол поворота часовой стрелки в час в градусах
         
   const sideBlock = diam => Math.floor(diam/Math.sqrt(2)); // Функция которая вычисляет диогональ прям. описанной окруж.
   
      
   btn.addEventListener('click', hideInput);   

   function hideInput() {
   const value = +input.value;  
   if (!value || value > 800 || value < 200) {
    return  alert('Введите диаметр от 200 до 800 пикселей');
   }  
      div.classList.add('hide');
      clockBuild(value);
   }

   function clockBuild(diam) {
   
   const clock = circleBuild(diam, container);
   
   }




   function circleBuild(diam, parent) {
      const side = sideBlock(diam);
      console.log(side);
      const circle = document.createElement('div');
      circle.style.width = side + 'px';
      circle.style.height = side + 'px';
      circle.classList.add('baground_circle');
      parent.append(circle);
      }  
   // Функция которая устанавливает текущее время
   function getTime() {
      const data = new Date();
      const hours = data.getHours()*degHour;
      const minuts = data.getMinutes()*deg;
      const second = data.second()*deg;
    
      hoursArrow.style.transform = `ratazeZ(${hours + minuts/hour}deg)`;
      minutsArrow.style.transform = `ratazeZ(${minuts}deg)`;
      secondsArrow.style.transform = `ratazeZ(${second}deg)`;

   }   
});




  
 