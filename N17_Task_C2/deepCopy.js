"use strict"

      function deepCopyObj(obj) {
            const copyObj = {};
         if (!Object.keys(obj).length) return copyObj;
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
            const copyArr = [];
         if (!arr.length) return copyArr;
         for (const elem of arr) {
            if (Array.isArray(elem)) {
              copyArr.push(deepCopyArr(elem));
            } else if (elem instanceof Object) {
               copyArr.push(deepCopyObj(elem));
            } else {
               copyArr.push(elem);
            }

         }
            return copyArr;
      }

     
      function deepCopy(obj) {
         if (Array.isArray(obj)) {
            return deepCopyArr(obj);
         } else if (obj instanceof Object) {
            return deepCopyObj(obj);
         } else {
            return obj;
         }
     }



