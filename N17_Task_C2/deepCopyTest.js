  "use strict"


  const h1 = { a: 5, b: { b1: 6, b2: 7 }, c: [33, 22], d: null, e: undefined, f: Number.NaN };
  const h2 = deepCopy(h1);
 
  const testObject = [
    {condition:h1 === h2, test:'тест 1.1', res: false },
    {condition:h1.a === h2.a, test:'тест 1.2', res: true},
    {condition:h1.b === h2.b, test:'тест 1.3', res: false}, 
    {condition:h1.b.b1 === h2.b.b1, test:'тест 1.4', res: true},
    {condition:h1.c === h2.c, test:'тест 1.5', res: false},
    {condition:h1.c[0]===h2.c[0], test:'тест 1.6', res: true},
    {condition:h1.d===h2.d, test:'тест 1.7', res: true},
    {condition:h1.e===h2.e, test:'тест 1.8', res: true},
    {condition:isNaN(h2.f) , test:'тест 1.9', res: true},
    {condition:h2.c instanceof Array, test:'тест 1.10', res: true}
  ]

  deepCopyTest(testObject);

  const a1 = [5, { b1: 6, b2: 7 }, [33, 22]];
  const a2 = deepCopy(a1); 

  const testArr = [
    {condition:a1===a2, test:'тест 2.1', res: false },
    {condition:typeof(a2)===typeof(a1), test:'тест 2.2', res: true},
    {condition:a1[0]===a2[0], test:'тест 2.3', res: true}, 
    {condition:a1[1]===a2[1], test:'тест 2.4', res: false},
    {condition:a1[1].b1===a2[1].b1, test:'тест 2.5', res: true},
    {condition:a1[2]===a2[2], test:'тест 2.6', res: false},
    {condition:a1[2][0]===a2[2][0], test:'тест 2.7', res: true},
    {condition:a1[3]===a2[3], test:'тест 2.8', res: true},
    {condition:a1[4]===a2[4] , test:'тест 2.9', res: true},
    {condition:isNaN(a2[5]), test:'тест 2.10', res: true},
    {condition:a2[2] instanceof Array, test:'тест 2.11', res: true}
  ]

  deepCopyTest(testArr);

  const v1="sss";
  const v2=deepCopy(v1);
  const testString= [
    {condition:typeof(v2)===typeof(v1), test:'тест 3.1', res: true },
    {condition:v1===v2, test:'тест 3.2', res: true}
      
  ]
  deepCopyTest(testString);

  const z1=null;
  const z2=deepCopy(z1);
  const testNull= [
    {condition:typeof(z2)===typeof(z1), test:'тест 4.1', res: true },
    {condition:z1===z2, test:'тест 4.2', res: true}
      
  ]
  deepCopyTest(testNull);

  const n1=Number.NaN;
  const n2=deepCopy(n1);
  const testNaN= [
    {condition:typeof(n2)===typeof(n1), test:'тест 4.1', res: true },
    {condition:isNaN(n2), test:'тест 4.2', res: true}
      
  ]
  deepCopyTest(testNaN);



  function deepCopyTest(arr) {
    var count = 0;   
                                  
       arr.map(elem => {
       if ((elem.condition && elem.res) || (!elem.condition && !elem.res)) {
         console.log(`${elem.test} : ожидаемый результат ${elem.res} : полученный результат ${elem.res} - ТЕСТ ПРОЙДЕН`);
       }  else {
        count++;
        console.log(`${elem.test} : ожидаемый результат ${elem.res} полученный результат ${!elem.res} - ТЕСТ НЕ ПРОЙДЕН!!!!`);
       }
    })
    console.log('Результаты тестирования:')
    console.log('Пройденных тестов'+':'+(arr.length - count));
    console.log('Не пройденных тестов'+':'+count);
    console.log('_________________________________________________________________________________________________')
    }
 

      
      
      
      