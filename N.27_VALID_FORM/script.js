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
       forImpURL: 'URL введен некоректно!'

    }
    

    let {isValid, formTag, inputs } = ui;
    const {validUrl, validEmail} = rule;
    const {forInpEmpty, forInpLong, forInpNumber, forInpEmail, forImpURL} = errMessagers;
    
   for (let elem of inputs) {
      if (elem.dataset.required) {
         elem.addEventListener('blur', function(EO)  {
           EO=EO||window.event;
           const target = EO.target;
           const inpValue = target.value;
           const input = target.dataset.required;
                  
         if (!inpValue.length) {
            showErrMessage(target, forInpEmpty);
            isValid = !isValid;

         } else if (!inpValue.length > 30) {
              showErrMessage(target, forInpLong);
              isValid = !isValid;

         } else if (input === 'url') {
             if (!validUrl.test(inpValue)) {
                showErrMessage(target, forImpURL );
                isValid = !isValid;
             } 

         } else if (input === 'email') {
              if(!validEmail.test(inpValue)) {
                 showErrMessage(target, forInpEmail);
                  isValid = !isValid;
              }
         } else if (input === 'usersCount') {
            if (isNaN(inpValue)) {
               showErrMessage(target, forInpNumber);
               isValid = !isValid;
            }
         } else if (input === "date") {
            console.log(inpValue);
         }
         
         

         });
      }
   }

for (let elem of inputs) {
   if (elem.dataset.required) {
      elem.addEventListener('change', () => {
         const parent = elem.parentElement;
         const err = parent.querySelector('.invalid')
         if (err) {
            elem.classList.remove('invalid_inp');
            err.remove(); 
         }
            
         
      })
   }
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



var validator = {
    validateDate : function( date )
    {
        var aTmp = date.split(".");
        if(aTmp.length!=3)
        {
            return false;
        }
 
        //Границы разрешенного периода. Нельзя ввести дату до 1990-го года и позднее 2020-го.
        if((parseInt(aTmp[2], 10)<= 1990)||(parseInt(aTmp[2], 10)>=2020))
        {
            return false;
        }
 
        var sTmp=aTmp[2] +'-'+ aTmp[1]+'-'+ aTmp[0];
 
        if(new Date(sTmp)=='Invalid Date')
        {
            return false;
        }
        else
        {
            return true;
        }
    }
     
}



