'use strict'


 const arr = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];

function collectWords(word, word2) {
  const arrWord = checkWord(word);
  let items = [word];

 return function serchWords(word) {
         for (const elem of word) {
            let item = checkWord(elem);
            if (item.length !== 0) {
               if (items.indexOf(elem) == -1) {
                  items.push(elem);
               }
                  items.push(item[0]);
                return serchWords(item);
            }
         }
         const result = items.join('-')+'-'+word2; 
         return result;
      }(arrWord)
       
}


function checkWord(word) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
     if (checkLetter(arr[i], word)) {
        let elem = arr.splice(i, 1);
        newArr.push(elem[0]);
     }
  }
  return newArr;
}


function checkLetter(str1, str2 ) {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
       count++;
    }
  }
  return count === 1;
}

console.log(collectWords("МУХА", "СЛОН"));
//console.log(collectWords("ЛИСА", "ЛОСЬ"));



