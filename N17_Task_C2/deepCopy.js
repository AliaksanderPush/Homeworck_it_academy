"use strict"

    function deepCopyObj(obj) {
       if (!Object.keys(obj).length) return obj;
         const copyObj = {};
         for (const key in obj) {
            if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
               copyObj[key] = deepCopyObj(obj[key]);

            } else if (Array.isArray(obj[key])) {
               copyObj[key] = deepCopyArr(obj[key]);
            } else {
               copyObj[key] = obj[key];
            }         
            
         }
         return copyObj;
      }

      function deepCopyArr(arr) {
         if (!arr.length) return arr;
          const copyArr = [];
         for (const elem of arr) {
            if (Array.isArray(elem)) {
              copyArr.push(deepCopyArr(elem));
            } else if (elem instanceof Object && !Array.isArray(elem)) {
               copyArr.push(deepCopyObj(elem));
            } else {
               copyArr.push(elem);
            }

         }
            return copyArr;
      }

     
     function deepCopy(obj) {
      if (obj === null) {
         return null;
      } else if (obj === undefined) {
         return;  
      } else if (obj === false) {
         return false;
      } else if (obj === true) {
         return true;
      } else if (obj === Number.NaN) {
         return Number.NaN;
      } else if (typeof(obj) === 'string' || typeof (obj) === 'number') {
         return obj;
      } else if (obj instanceof Object && !Array.isArray(obj)) {
          return deepCopyObj(obj);
      } else if (Array.isArray(obj)) {
         return deepCopyArr(obj);
      } 
     }

