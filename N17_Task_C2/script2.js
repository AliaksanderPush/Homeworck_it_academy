
const a1=[ 5, {b1:6,b2:7}, [33,22]];
const h1 = { a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };


function deepCopy(obj) {
    const copyObj = {};
    for(const i in obj) {
      if (obj[i] instanceof Object && !(obj[i] instanceof Array)) {
        copyObj[i] = deepCopy(obj[i]);
        continue;
      } else if ((obj[i] instanceof Array)) {
        copyObj[i] = JSON.parse(JSON.stringify(obj[i])); 
      } else {
          copyObj[i] = obj[i];
      }
      
    }
    return copyObj;
  }


const h2 = deepCopy(h1);
console.log(h1===h2);
console.log(h1.a===h2.a);
console.log(h1.b===h2.b);
console.log(h1.b.b1===h2.b.b1);
console.log(h1.c===h2.c);
console.log(h1.c[0]===h2.c[0]);
console.log(h1.d===h2.d);
console.log(h1.e===h2.e);
console.log(isNaN(h2.f));
console.log(h2.c instanceof Array);

function deepCopy2(arr) {
    const copyArr = [];
    for(const elem of arr) {
      if (Array.isArray(elem)) {
        copyArr.push(deepCopy(elem));
        } else if ((elem instanceof Object && !Array.isArray(elem))) {
        copyArr.push(JSON.parse(JSON.stringify(elem))); 
      } else {
        copyArr.push(elem);
      }
      
    }
    return copyArr;
  }
  
  const a2=deepCopy2(a1); 
  console.log(a1===a2);
  console.log(typeof(a2)===typeof(a1));
  console.log(a1[0]===a2[0]);
  console.log(a1[1]===a2[1]);
  console.log(a1[1].b1===a2[1].b1);
  console.log(a1[2]===a2[2]);
  console.log(a1[2][0]===a2[2][0]);
  console.log(a1[3]===a2[3]);
  console.log(a1[4]===a2[4]);
  console.log(isNaN(a2[5]));
  console.log(a2[2] instanceof Array);
