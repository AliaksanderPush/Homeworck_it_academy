
function deepComp(object1, object2) {
  
 if (Array.isArray(object1) && Array.isArray(object2)) {
      return  compareArray(object1, object2);

   } else if (object1 instanceof Object && !Array.isArray(object1) &&
              object2 instanceof Object && !Array.isArray(object2)) {
      return  compareObject(object1, object2);

   } else if (typeof object1 === 'number' && isNaN(object1) &&
              typeof object1 === 'number' && isNaN(object2)) {
      return true;

   }  else {
      return object1 === object2;
   }
}

 

function compareArray(array1, array2) {
  if (array1.length !== array2.length) {
     return false;
  } 
      const arr1 = array1.sort((a,b) => a - b);
      const arr2 = array2.sort((a,b) => a - b);
   
      return arr1.every((value, i) => { 
   
      if (Array.isArray(value) && Array.isArray(arr2[i])) {
         return  compareArray(value, arr2[i]);

      } else if ((value instanceof Object  &&  arr2[i] instanceof Object &&
          value !== null  && arr2[i] !== null)) {
        return  compareObject(value, arr2[i]);

      } else if ( isNaN(value) && typeof value === 'number' &&
                  isNaN(arr2[i]) && typeof arr2[i] === 'number') {
         return true;      

      }  else {
         return  value === arr2[i]; 
      } 
});
 
}

function compareObject(obj1, obj2) {
   
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) {
     return false;
  }

   for (const key in obj1) {
      if (!(key in obj2)) {
         return false;
      }
   }
   return keys1.every( key => {
     if (Array.isArray(obj1[key]) && Array.isArray(obj1[key])) {
        return compareArray(obj1[key],obj2[key]);

     } else  if (obj1[key] instanceof Object  &&  obj2[key] instanceof Object &&
          obj1[key] !== null  && obj2[key] !== null) {
        return compareObject(obj1[key],obj2[key]);
           
      } else if ( isNaN(obj1[key]) && typeof obj1[key] === 'number' &&
                  isNaN(obj2[key]) && typeof obj2[key] === 'number') {
         return true;      

      } else {
          return obj1[key] === obj2[key];
      }
   });
}




