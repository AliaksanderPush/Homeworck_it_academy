
function deepComp(object1, object2) {
  
 if (Array.isArray(object1) && Array.isArray(object2)) {
      return  compareArray(object1, object2);

   } else if (Array.isArray(object1) === Array.isArray(object2) &&
              object2 instanceof Object && object1 instanceof Object) {
      return  compareObject(object1, object2);

   } else if ( isNaN(object1) && typeof object1 === 'number' &&
               isNaN(object2) && typeof object2 === 'number') {
      return true;     

   }  else {
      return object1 === object2;
   }
}

 

function compareArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
   let result = arr1.every((value, i) => deepComp(value, arr2[i]));
   return result;  
}

function compareObject(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) return false;
  
   for (const key in obj1) {
      if (!(key in obj2)) return false;
   }

   let result = keys1.every( key =>  deepComp(obj1[key], obj2[key]));
   return result;
}




