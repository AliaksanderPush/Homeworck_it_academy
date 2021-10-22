"use strict"
     

    let ui = {
      formTag: document.forms.INFO,
      inputsAll: document.forms.INFO.elements,
      radio: document.forms.INFO.elements['deploy_site'],
      }
    const rule = {
       validUrl: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
       validEmail: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
    }
    
    const {formTag, inputsAll, radio, checkBox } = ui;
    const {validUrl, validEmail} = rule;

  /* При отправке формы опрашиваем функции, которые отвечают за разные поля при разных 
  событиях. Если обе функции вернули true отправим форму иначе не отрпавим)
  */     

   formTag.addEventListener('submit', EO => {
      EO=EO||window.event;
     const result = onValidForm();
     const rad = checkRadioInput(radio);
       if (!rad || !result) {
      EO.preventDefault(); 
     } 
   });
 /* При событии blur  проверим валидность заполненных полей фукцией checkInput(elem);
  если поле не валидное, вызовем фукцию для формирования сообщения об обшибке, передав ей 
  элемент, который не прошел валидацию и покажем наведением фокуса  это поле
*/

  for (let elem of inputsAll) {
      if (elem.dataset.required) {
         elem.addEventListener('blur', () => {              
            const isValidInput = checkInput(elem);
              if (!isValidInput) {
              showErrMessage(elem);
            }else {
             const parent = elem.parentElement;
             const err = parent.querySelector('.invalid')
               if (err) {
                  elem.classList.remove('invalid_inp');
                  err.remove(); 
               }
            }
        });
      }      
   }
/* Данной функцией мы воспользуемся при отправке формы, он проверит валидность 
полей и вернет true либо false
*/


   function onValidForm() {
    let result = true;
    let arr = [];
       for (let input of inputsAll) {
         if (input.dataset.required) {
           const isValidInput = checkInput(input);
          if (!isValidInput) {
            showErrMessage(input);
              arr.push(input);
               result = false;
          }  
         }
      }
      if (arr[0]) {
       arr[0].focus();
      }
       return result;  
   }

    

/* проверяем поля по следующим правилам:
Поле разработчики и имя сайта проверяем на пустоту и количество введенных символов
Поле URL и email проверяем на коректность регуляркой по правилу, которое описано в rule 
Поле userCount провиряем что б значение было не пустым и числовым
Поле data проверяем функцией validateDate(dat) на ограничение по годам 
Textarea проверяем на пустоту и макс количество введенных символов
В селекте ограничен выбор. Выбрать первый селект нельзя
В функции используется блок try catch чтоб выловить ошибки, которые могут возникнуть в 
самом коде 
*/


   
   function checkInput(elem)  {     
   
      try {
           const value = elem.value.trim();
           const valueLength = value.length; 
           const input = elem.dataset.required;
       
          switch (input) {
            case 'text':
               return (valueLength>0 && valueLength<30);
            break;
            case 'url':
              return (valueLength>0 && validUrl.test(value));
            break;
            case 'email':
              return (valueLength>0 && validEmail.test(value));
            break;
            case 'usersCount':
               return  (valueLength>0 && !isNaN(value));
            break;
            case 'date':
               return validateDate(value);
            break;
            case 'textarea':
               return (valueLength>0 && valueLength<100)
            break;
            case 'select':
              return  value !== '1';
            break;
            case 'checkbox':
              return  elem.checked;
            break;
           
         }
      }
      catch{
         alert('Что-то пошло не так, Пересмотрите заполнение формы, возможно, это всё из-за вас!');
         return false;
      }
    
   }

  
//Формируем сообщение об ошибке по переданному элементу и выводим его

function showErrMessage(elem) {
   if (!elem.classList.contains('invalid_inp')) {
      elem.classList.add('invalid_inp');
      const parent = elem.parentElement;
      const mes = elem.dataset.err;
      const span = document.createElement('span');
      span.innerHTML = mes || 'Некоректно введены данные!';
      span.className = 'invalid';
      parent.append(span);
   }  else {
      return;
   }
  
} 

/* Функция проверяет коректность выбранной даты. Год в дате не должен быть больше текущего
и не должен быть меньше 2016. 
*/
function validateDate(dat) {
   const date = dat.split('-'); 
   const dataNow = new Date();
   const year = dataNow.getFullYear();
      if (parseInt(date[0], 10)<=2016 || date[0] > year)   {
         return false;
      }
      const fullDate = date[0] +'-'+ date[1]+'-'+ date[2];
         if(new Date(fullDate)=='Invalid Date') {
            return false;
         }  else {
            return true;
         }
}

/* Функция, которая проверяет 
радио кнопки.  Они должны быть отмечены,
иначе форма не отправится.
*/

 function checkRadioInput(element) {
    try {
       if (element.value == "") {
         showErrMessage(element[2]);
         document.getElementById('CAT11').scrollIntoView();
         return false;
      }
      return true;
    }
   catch {
      alert('Что-то пошло не так, пересмотрите заполнение формы!')
   }
 }  
 
 // убираем сообщение об ошибке с радиокнопок 
 for (let elem of radio) {
   elem.addEventListener('click', () => {
   const parent = elem.parentElement;
   const err = parent.querySelector('.invalid')
      if (err) {
         elem.classList.remove('invalid_inp');
         err.remove(); 
      }
   })
         
 }
 


