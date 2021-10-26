
function deepComp(object1, object2) {
  
 if (Array.isArray(object1) && Array.isArray(object2)) {
      return  compareArray(object1, object2);

   } else if (object1 instanceof Object && !Array.isArray(object1) &&
              object2 instanceof Object && !Array.isArray(object2)) {
      return  compareObject(object1, object2);

   } else if ( isNaN(object1) && typeof object1 === 'number' &&
               isNaN(object2) && typeof object2 === 'number') {
         return true;     

   }  else {
      return object1 === object2;
   }
}

 

function compareArray(arr1, arr2) {
  if (arr1.length !== arr2.length) {
       return false;
  } 
      return arr1.every((value, i) => { 
          return  deepComp(value, arr2[i]);
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
       return deepComp(obj1[key],obj2[key]);
   });
}




