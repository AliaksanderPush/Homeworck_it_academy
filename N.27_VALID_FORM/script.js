"use strict"
     

    let ui = {
      isValid:true,
      formTag: document.forms.INFO,
      inputs: document.forms.INFO.elements,
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
       forSelect: 'Извините, эта рубрика сейчас недоступна, выберите пожалуйста другую'

    }
    

    let {isValid, formTag, inputs } = ui;
    const {validUrl, validEmail} = rule;
    const {forInpEmpty, forInpLong, forInpNumber, forInpEmail, forImpURL, forDate, forSelect} = errMessagers;
    
   for (let elem of inputs) {
      if (elem.dataset.required) {
         elem.addEventListener('blur', function(EO)  {
           EO=EO||window.event;
           const target = EO.target;
           const inpValue = target.value;
           const input = target.dataset.required;

          switch (input) {
            case 'text':
               if (!inpValue.length) {
                  showErrMessage(target, forInpEmpty);
                  isValid = !isValid;
               }
            break;
            case 'text':
               if (inpValue.length > 30) {
                  showErrMessage(target, forInpLong);
                  isValid = !isValid;
               }
            break;
            case 'url':
               if (!validUrl.test(inpValue)) {
                  showErrMessage(target, forImpURL );
                  isValid = !isValid;
               } 
            break;
            case 'email':
               if(!validEmail.test(inpValue)) {
                  showErrMessage(target, forInpEmail);
                   isValid = !isValid;
               }
            break;
            case 'usersCount':
               if (isNaN(inpValue)) {
                  showErrMessage(target, forInpNumber);
                  isValid = !isValid;
               }
            break;
            case 'date':
               if (!validateDate(inpValue)) {
                  showErrMessage(target, forDate);
                  isValid = !isValid; 
               }
            break;
            case 'textarea':
               if (inpValue.length > 300) {
                  showErrMessage(target, forInpLong);
                    isValid = !isValid; 
               } 
            break;
            default:
               isValid = true;  
            break;
         }
         });
      }
   }

   for (let elem of inputs) {
      if (elem.dataset.sel) {
         elem.addEventListener('change', EO => {
            const target = EO.target;
            const selValue = target.value;
            if (selValue === '1') {
               showErrMessage(target, forSelect);
                isValid = !isValid; 
           } else {

           }
         })
      }
   }



for (let elem of inputs) {
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


   