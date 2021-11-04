'use strict'


 const arr = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
/*
function collectWords(word, word2) {
  const arrWord = checkWord(word);
  let items = [word];
 
 return function serchWords(word) {
         for (let elem of word) {
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
*/

function collectWords(word, word2) {
  const arrWord = checkWord(word);
  let items = [word];
 
 return function serchWords(word) {
        let mas = [];
         for (let elem of word) {
            let item = checkWord(elem);
              mas.push(item);
              console.log(mas)
            if (item.length !== 0) {
               if (items.indexOf(elem) == -1) {
                  items.push(elem);
                  
               }
                  items.push(item[0]);
              //  return serchWords(item);
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
       // let elem = arr.splice(i, 1);
        newArr.push(arr[i]);
     }
  }
  return newArr;
}




//console.log(checkWord('ЛИСА'))

function checkLetter(str1, str2 ) {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
       count++;
    }
  }
  return count === 1;
}

//console.log(collectWords("МУХА", "СЛОН"));
//console.log(collectWords("ЛИСА", "ЛОСЬ"));

const arr5 = [['ЛИГА','ЛИПА'],['ЛИРА', 'ЛИПА'],['ЛИРА', 'ЛИГА', 'ЛУПА']];

function sortArr(arr) {
 let res =  arr.reduce((prev, item) => {
  return  prev.concat(item);
  },[])
 
  let prev = res[0];
  let mes = [];
for (let i=0; i<res.length;i++) {
  if (res[i] !==prev) {
      mes.push(res[i]);
  }

}



return mes;
  


} 
console.log(sortArr(arr5));