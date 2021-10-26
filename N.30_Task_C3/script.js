var H1={ a:5, b: { b1:6, b2:7 } };
var H2={ b: { b1:6, b2:7 }, a:5 };
var H3={ a:5, b: { b1:6 } };
var H4={ a:5, b: { b1:66, b2:7 } };
var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
var H6={ a:null, b:undefined, c:Number.NaN };
var H7={ c:Number.NaN, b:undefined, a:null };
var H8={a:5,b:6};
var H9={c:5,d:6};
var H10={a:5};
var A1=[5,7];
var A2=[5,5,7];
var A3=[5,8,7];

let a = [1, 2, 3, 4, 5, 6, 7];
let b = [7, 1, 2, 3, 4, 5, 6];
let c = [[3,5],[1,2],9];
let d = [[3,5],[1,2,3],9];
 

function deepComp(object1, object2) {
  
 if (Array.isArray(object1) && Array.isArray(object2)) {
      return  compareArray(object1, object2);

   } else if (object1 instanceof Object && !Array.isArray(object1) &&
              object2 instanceof Object && !Array.isArray(object2)) {
      return  compareObject(object1, object2);

   } else if (typeof object1 === 'number' && isNaN(object1) &&
              typeof object1 === 'number' && isNaN(object2)) {
      return true;

   } else {
      return object1 === object2;
   }
}
console.log();
 

function compareArray(array1, array2) {
  if (array1.length !== array2.length) {
     return false;
  } 
      const arr1 = array1.sort((a,b) => a - b);
      const arr2 = array2.sort((a,b) => a - b);
   
      return arr1.every((value, i) => { 
   
      if (Array.isArray(value) && Array.isArray(arr2[i])) {
         return  compareArray(value, arr2[i]);
      } else {
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
      if ((obj1[key] instanceof Object ) && (obj2[key] instanceof Object) &&
          (obj1[key] !== null ) && (obj2[key] !== null)) {
        return compareObject(obj1[key],obj2[key]);
           
      } else if ( isNaN(obj1[key]) && typeof obj1[key] === 'number' &&
                  isNaN(obj2[key]) && typeof obj2[key] === 'number') {
         return true;      

      } else {
          return obj1[key] === obj2[key];
      }
   });
}



//console.log(compareObject(H1,H2));
