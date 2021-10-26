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


const testObject = [
    {result:deepComp(H1,H2), test:'тест 1.1', res: true },
    {result:deepComp(H1,H3), test:'тест 1.2', res: false},
    {result:deepComp(H1,H4), test:'тест 1.3', res: false}, 
    {result:deepComp(H1,H5), test:'тест 1.4', res: false},
    {result:deepComp(H6,H7), test:'тест 1.5', res: true},
    {result:deepComp(H8,H9), test:'тест 1.6', res: false},
    {result:deepComp(H8,H10), test:'тест 1.7', res: false},
    {result:deepComp(null,H10), test:'тест 1.8', res: false},
    {result:deepComp(H10,null), test:'тест 1.9', res: false},
    {result:deepComp(null,null), test:'тест 1.10', res: true},
    {result:deepComp(null,undefined), test:'тест 1.11', res: false},
    {result:deepComp(5,"5"), test:'тест 1.12', res: false},
    {result:deepComp(5,H1), test:'тест 1.13', res: false},
    {result:deepComp(A1,H1), test:'тест 1.14', res: false},
    {result:deepComp(A2,A3), test:'тест 1.15', res: false},
    {result:deepComp({a:5,b:undefined}, {a:5,c:undefined}), test:'тест 1.16', res: false},
    {result:deepComp([5,7],{0:5,1:7}), test:'тест 1.17', res: false},
    {result:deepComp([5,7],{0:5,1:7,'length':2}), test:'тест 1.18', res: false},
    {result:deepComp("aaa","bbb"), test:'тест 1.19', res: false},
    {result:deepComp(Number.NaN,Number.NaN), test:'тест 1.20', res: true}
  ];

 function deepCopyTest(arr) {
    let count = 0;   
                                  
       arr.forEach(elem => {
       if ((elem.result && elem.res) || (!elem.result && !elem.res)) {
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
    deepCopyTest(testObject);
   
   