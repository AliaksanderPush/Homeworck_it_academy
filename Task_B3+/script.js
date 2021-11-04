'use strict'

//Функция работает со строкой и группирует полож числа,отриц.,дробные и т.д и складывает в массив
//Можно было бы заморочится и еще больше написать вариантов, но функция итак громоздская и лучше,наверное, регулярками такое делать

function numberSort(str) {
   const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
   const mark = ['+', '-', '*', '/','.',')','('];
   let arr = [];
   let strNum = '';
   let count = 0;
   for (let j = 0; j<str.length; j++) {
      if (str[j] === '(') {
         count++;
      } else if (str[j] === ')') {
         count--;
      } else if (mark.indexOf(str[j]) !== -1 && (str[j + 1] === '*'|| str[j + 1] === '/' || str[j + 1] === '.' || str[j + 1] === '+') ) {
         alert('Два знака операции вподряд недопустимы!');
           return null;
      } else if ([...numbers,...mark].indexOf(str[j]) === -1) {
         alert('Что-то Вы ввели некоректно!');
           return null; 
      } else if ((numbers.indexOf(str[j]) !== -1 && 
                  numbers.indexOf(str[j + 1]) !== -1 &&
                  numbers.indexOf(str[j + 2]) !== -1) ||
                  str[j] === '.' && numbers.indexOf(str[j + 1]) !== -1 &&
                  numbers.indexOf(str[j + 2]) !== -1) {
                    alert('Калькулятор может работать с числами до 100 и дробями до одного знака после точки!');
                     return null;
                 }
   }
if (count !== 0) {
   alert('Скорей всего вы неправильно расставили скобки в выражении!');
      return null;
}

   for (let i = 0; i < str.length; i++) {
      if ((str[i] === '-' && i === 0 && str[i + 2] === '.')) { // ищем и формируем строку вида: -2.5
         strNum = str[i]+str[i + 1] + str[i + 2] + str[i + 3];// если выраж. начинается с него
         str = str.slice(0, i)+str.slice(i + 3);
         arr.push(strNum);
      } else if (str[i] === '-' && i === 0 && numbers.indexOf(str[i + 1]) != -1 && numbers.indexOf(str[i + 2]) != -1) { // если начинается вот так: -20
         strNum = str[i]+str[i + 1] + str[i + 2];
         str = str.slice(0,i)+str.slice(i+2);
         arr.push(strNum);   
      } else if (str[i] === '-' && i === 0 && numbers.indexOf(str[i + 1]) != -1 ) { // если начинается вот так: -5
         strNum = str[i]+str[i + 1];
         str = str.slice(0,i)+str.slice(i+1);
         arr.push(strNum);   
      } else if((str[i -1] === '(' && str[i] === '-' && numbers.indexOf(str[i + 1]) != -1 && numbers.indexOf(str[i + 2]) != -1)) {
         strNum = str[i]+str[i + 1] + str[i + 2];// если начинается вот так: (-20)
         str = str.slice(0,i)+str.slice(i+2);
         arr.push(strNum);   
      } else if (str[i -1] === '(' && str[i] === '-' && str[i + 2] === '.') { // ище все дробные отриц числа: (-2.5)
         strNum = str[i] + str[i + 1] + str[i + 2] + str[i + 3];
         str = str.slice(0, i) + str.slice((i + 1)+ 2);
         arr.push(strNum);
      } else if (str[i - 1] === '(' && str[i] === '-') { // ищем все недробные отриц числа: -8
         strNum = str[i] + str[i + 1];
         str = str.slice(0, i) + str.slice((i + 1));
         arr.push(strNum);
      } else if (str[i + 1] === '.') { //ищем дробные положительные числа:2.3
         strNum = str[i] + str[i + 1] + str[i + 2];
         str = str.slice(0, i) + str.slice((i + 1) + 1);
         arr.push(strNum);
      } else if (numbers.indexOf(str[i]) != -1 && numbers.indexOf(str[i + 1]) != -1) { // ищем двухзначные числа:20
         strNum = str[i] + str[i + 1];
         str = str.slice(0, i) + str.slice((i + 1));
         arr.push(strNum);
      } else {
         arr.push(str[i]);
      }
   
   }
 return arr;
}
  

function miniCalculator(str) {
  const arr = numberSort(str); // получаем сгруппированный массив
 
return  function calculator(arr) {   
    let index1 = 0;
    let index2 = 0;
    let answer = 0;
    let minus = [];

    if (arr[0] === '-') { // если перед скобками стоит первым элементом минус
      minus = arr.splice(0, 1);// то вырежем его и положим в пустой массив
       
    }
        
   for (let i = 0; i < arr.length; i++) { // сначало работаем со значениями в скобках
      if (arr[i] === '(') {
         index1 = i;            
      } else if (arr[i] === ')') {
         index2 = i;
         let index = index2 - index1;    
         let valueBrackets = arr.splice(index1, index + 1); // вырежем все что есть в скобках
         valueBrackets.shift(); //сразу удалим скобки по краям
         valueBrackets.pop();
              
         if (valueBrackets.length === 1) { // Если в скобках оказалось выражение типа (-3), то мы положим его обратно
             arr.splice(index1, 0, valueBrackets[0]);
                      
         } else if (valueBrackets.length === 3) { // если в скобках выражение вида ['2','+','3'] то мы сразу посчитаем его фун-ей calkResult
            const responce2 =  calkResult(valueBrackets);
             arr.splice(index1, 0, responce2); //результат вставляем обратно в массив
                                      
         } else if (valueBrackets.length > 3) { // если в скобках много вских операций, то передадим все в фун-ю checkSign
            const responce3 = checkSign(valueBrackets);      
            arr.splice(index1, 0, responce3); //результат вставляем обратно в массив 
            
         }
            if (arr.includes('(')) { // рекурсивно вызовем функция опять,если там еще остались выражения в скобках
            return calculator(arr);
         } 
    
      }   
     
   }   
     if (minus.length !== 0) {
        arr[0] = minus[0]+arr[0];// вернем знак минус, если он был в перед скобками
     } 
   
     if (arr.length === 1) { // проверим что осталось с массивом после того как разобрались со скобками
        answer = arr[0]; // вернем ответ
     } else {
        answer = checkSign(arr); // если еще есть операции, то передаем в все в фун-ю checkSign(arr)
     }
     return answer;
 }(arr)

}
 
//console.log(miniCalculator(str));

function checkSign(arr) {
      let prop1 = '';
      let prop2 = '';
   
     if (arr.includes('*') || arr.includes('/')) { // Что бы расставить приоритеты сначало будем умножать и делить
          prop1 = '*';
          prop2 = '/';
      return insertResult(arr, prop1, prop2);// вынес группировку и цикл в отдельную функцию, что бы не было Don't repeat youself
         
      } else  {
          prop1 = '+';    // после деления и умнож. будем искать действия со сложением и вычет.
          prop2 = '-';      
      return insertResult(arr, prop1, prop2);
          
      } 
      
}


   function insertResult(arr, prop1, prop2) {
      
      let result = 0;
         for (let i=0; i<arr.length; i++) {
            if ((arr[i] === prop1 || arr[i] === prop2) && arr[i + 1] == '-') { // если в массиве есть унарный минус
                const minus = arr.splice(i + 1, 1);  
                const value1 = arr.splice(i - 1, 3);
                const resp1 = calkResult(value1); 
                 
                if (resp1 > 0) {  // проверим какое число получилось после вычислений
                   arr.splice(i - 1, 0, minus[0]+resp1); //если положительное,то вернем обратно минус
                   
                 
                  } else {
                  const resp1Abs = Math.abs(resp1);// если отриц, то минус на минус даст плюс, сделаем результат положит.
                   arr.splice(i - 1, 0, resp1Abs); 
                  
                  }
            }

            if (arr[i] === prop1 || arr[i] === prop2) {  // взависимости от знака вырезаим выражения и вычисляем их,результат вставляем обратно
                  const value2 = arr.splice(i - 1, 3);
                  const resp2 = calkResult(value2);
                  arr.splice(i - 1, 0, resp2);
            } 
                  
         }
            if (arr.length === 1) { // вернем результат , если вычислять больше нечего
                  result = arr[0];
               } else if (arr.length === 2) {  
                  alert('Что-то пошло не так!');
                  return null;
               } else {
                  return checkSign(arr); // иначе вызовем фун-ю рекурсивно
               }
      return result;          
   }
     
// Функция принимает массив вида ['2','+','2'] и взращает результат вычисления
     function calkResult(arr) {
         let result = 0;
         for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '*') {
              result = Number(arr[i - 1]) * Number(arr[i + 1]);
            } else if (arr[i] === '/') {
              result = Number(arr[i - 1]) / Number(arr[i + 1]);
            } else if (arr[i] === '+') {
              result = Number(arr[i - 1]) + Number(arr[i + 1]);
            } else if (arr[i] === '-') {
              result = Number(arr[i - 1]) - Number(arr[i + 1]);
            } 
         }
          
          return result;
      }


