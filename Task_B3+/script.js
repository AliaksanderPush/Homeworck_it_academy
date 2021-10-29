'ese strict'

//Функция работает со строкой и группирует полож числа,отриц.,дробные и т.д и складывает в массив
//Можно было бы заморочится и еще больше написать вариантов, но функция итак громоздская и лучше,наверное, регулярками такое делать

function numberSort(str) {
   let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
   let arr = [];
   let strNum = '';
   for (let i = 0; i < str.length; i++) {
      if ((str[i] === '-' && i === 0 && str[i + 2] === '.')) { // ищем и формируем строку вида: -2.5
         strNum = str[i]+str[i + 1] + str[i + 2] + str[i + 3];// если выраж. начинается с него
         str = str.slice(0,i)+str.slice(i+3);
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
    let prop1 = '';
    let prop2 = '';
    let result = 0;
    
   for (let i = 0; i < arr.length; i++) { // сначало работаем со значениями в скобках
      if (arr[i] === '(') {
         index1 = i;            
      } else if (arr[i] === ')') {
         index2 = i;
         let index = index2 - index1;    
         let valueBrackets = arr.splice(index1, index + 1);// формируем фрагмент,который был внутри скобок
         valueBrackets.pop();  // удаляем по краям скобки
         valueBrackets.shift();
         if (valueBrackets.length === 1) { // Если в скобках оказалось выражение типа (-3), то мы его не отправляем
            arr.splice(index1, 0, valueBrackets[0]);// считаться, вставляем его сразу в массив
         } else {
            let resp1 = calkResult(valueBrackets); // отправляем фрагмент в функцию calkResult(valueBrackets), котора 
            arr.splice(index1, 0, resp1);  // посчитает и вернет результат
         }
            if (arr.includes('(')) { // рекурсивно вызовем функция опять,если там еще остались выражения в скобках
            return calculator(arr);
         }
      }  
   }   // разобравшись со скобками ищем другие операции. 
     
      if (arr.includes('*') || arr.includes('/')) { // Что бы расставить приоритеты сначало будем умножать и делить
          prop1 = '*';
          prop2 = '/';
          result = insertResult(arr, prop1, prop2);// вынес группировку и цикл в отдельную функцию, что бы не было Don't repeat youself
         
      } else  {
          prop1 = '+';    // после деления и умнож. будем искать действия со сложением и вычет.
          prop2 = '-';      
          result = insertResult(arr, prop1, prop2);
          
      } 

      if (arr.length == 1) { // Проверяем полученные выше результат.Если в вернувшемся массиве одно число,то ответ очевиден
         result = arr[0];
         } else {  // если там есть еще какие-то выражения, то вызовем опять функцию рекурсивно
            return calculator(arr);
         }

   return result;
   }(arr)

}
 
//console.log(miniCalculator(str));

// Функция принимает массив и  знаки: либо '*/' либо '+-'.Ищет знак и вырезает 
// фрагмент вида ['2','+','2'] что б передать в функцию calkResult(arr), которая умеет
// считать такие фрагменты и получив результат вставляет назад в массив и возращаем его
   function insertResult(arr,prop1, prop2) {
         for (let i=0; i<arr.length; i++) {
            if (arr[i] === prop1 || arr[i] === prop2) {
               let index = i - 1;
               let value = arr.splice(index, 3);
               let resp = calkResult(value);
               return arr.splice(index, 0, resp);
            } 
         }
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

