"use strict"
     

    let ui = {
      formTag: document.forms.INFO,
      inputsAll: document.forms.INFO.elements,
    }
    const rule = {
       validUrl: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
       validEmail: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/
    }
    
    const errMessagers = {
       forInpEmpty: 'Это поле обязательное для заполнения!',
       forInpLong: 'Значение слишком длинное!',
       forInpNumber: 'Значение должно быть числовое!',
       forInpEmail: 'Email введен некоректно!',
       forImpURL: 'URL введен некоректно!',
       forDate: 'Вы ввели некоректную дату',
       forSelect: 'Извините, эта рубрика сейчас недоступна, выберите пожалуйста другую',
       forTextarea: 'Вы не ввели данные или строка слишком длинная!'

    }
    

    let {isValid, formTag, inputsAll } = ui;
    const {validUrl, validEmail} = rule;
    const {forInpEmpty, forInpLong, forInpNumber, forInpEmail, forImpURL, forDate, forSelect,forTextarea } = errMessagers;
    
   formTag.addEventListener('submit', EO => {
      EO=EO||window.event;
     // EO.preventDefault();
      onValidForm(EO);
   });
  
  for (let elem of inputsAll) {
      if (elem.dataset.required) {
         elem.addEventListener('blur', () => {
          const isValidInput = checkInput(elem);
          if (!isValidInput) {
             showErrMessage(elem, forInpLong);
          }
           
         });
      }      
   }



   function onValidForm(EO) {
      EO=EO||window.event;
      const inputs = [];
      for (let elem of inputsAll) {
         if (elem.dataset.required) {
            inputs.push(elem);
         }
      }
      
     if (inputs.length !==0) {
        const isValidForm = inputs.forEach(input => {
        const isValidInput = checkInput(input);
          if (!isValidInput) {
            showErrMessage(input, forInpLong);
           EO.preventDefault();
          } else {
             console.log('форма отправлена');
             return isValidInput;
          }
     });

     }  else {
        alert('Что-то не так с формой');
        EO.preventDefault();
        
     }
   
      
   }

   

   
   function checkInput(elem)  {     
                 
      try {
           const value = elem.value;
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
         }
      }
      catch{
         alert('Что-то пошло не так, Пересмотрите заполнение формы, возможно, это всё из-за вас!');
         return false;
      }
    
   }
      
      
   

  

for (let elem of inputsAll) {
 //  if (elem.dataset.required) {
      elem.addEventListener('input', () => {
         const parent = elem.parentElement;
         const err = parent.querySelector('.invalid')
         if (err) {
            elem.classList.remove('invalid_inp');
            err.remove(); 
         }

      })
//   }
}


function showErrMessage(elem, mes) {
  if (!elem.classList.contains('invalid_inp')) {
     elem.classList.add('invalid_inp');
     const parent = elem.parentElement;
     const span = document.createElement('span');
     span.innerHTML = mes || "Поле заполнено неверно!";
     span.className = 'invalid';
     parent.append(span);
   } else {
      return;
   }
  
} 


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


   