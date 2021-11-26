
(function() {

const drinkStorage = new LocalStorageClass("lsDrink");
const dishStorage = new LocalStorageClass("lsDish");
 
 document.querySelector('.btn1').addEventListener('click', drinckInfo);
 document.querySelector('.btn5').addEventListener('click', drinckInfo);

 document.querySelector('.btn2').addEventListener('click', getDrinckInfo);
 document.querySelector('.btn6').addEventListener('click', getDrinckInfo);

 document.querySelector('.btn3').addEventListener('click', removeInfoDrinck);
 document.querySelector('.btn7').addEventListener('click', removeInfoDrinck);

 document.querySelector('.btn4').addEventListener('click', getDrinckInfoAll); 
 document.querySelector('.btn8').addEventListener('click', getDrinckInfoAll); 

 let flag = false;
 
 function start(flag)  {
    if (flag) {
    return ( 
  {
   prod : 'напиток, который',
   type : 'Он алкогольный',
   name: 'напиток',
   name2:'напитке',
   prod2: 'Напиток удален',
   prod3: 'напитка',
   prod4 :'напитков',
  // lsKeyName: ,
   typeProd: drinkStorage
   } 
    )
    } else {
      return (
   {
      prod : 'блюдо, которое',
      type : 'Оно вегетарианское',
      name: 'блюдо',
      name2: 'блюде',
      prod2: 'Блюдо удалено',
      prod3: 'блюда',
      prod4: 'блюд', 
  //    lsKeyName: ,
      typeProd: dishStorage
   } 
    )
    }
 }
 

 function drinckInfo() {
this.classList.contains('btn1') ? flag = true: flag = false
const elem = start(flag);
const {prod, type, typeProd} = elem;

 let  drinck = prompt(`Введите ${prod} Вы предпочитаете`,'');
    while (!drinck) {
      drinck = prompt(`
      Вы не ввели данные!!!! 
      Введите ${prod} Вы предпочитаете`,''); 
    }
    let alc = confirm(`${type} или нет?`,'');
    let rec = prompt(`Напишите  рецепт его приготовления`,'');
      while (!rec) {
         rec = prompt(`
         Вы не написали рецепт!!!
         Напишите рецепт его приготовления`,'');
      }
      
       typeProd.getstore();
       typeProd.addValue(drinck, {alcoholic:alc, recept:rec});
       typeProd.setStore();
       alert('Данные внесены успешно!');
 }   
 

 function getDrinckInfo() {
   this.classList.contains('btn2') ? flag = true: flag = false  
   const elem = start(flag);
   const {name, name2, typeProd} = elem;
   let getInfoDrinck = null;
  
    let getInfo = prompt(`Введите ${name} рецепт которого хотите узнать`,''); 
    if (!getInfo) {
      getInfo = prompt(`
       Вы не ввели данные!!!
       Введите ${name} рецепт которого хотите узнать`,''); 
    }
   
      getInfoDrinck = typeProd.getValue(getInfo);
      
   if (getInfoDrinck) {
      const {alcoholic, recept} = getInfoDrinck;
      alert(`
             ${name}: ${getInfo}
             алкогольный: ${alcoholic ? 'да':'нет'}
             рецепт приготовления: ${recept}`
           );
   } else {
      alert(`Информации о таком ${name2}  нет(((`);
   }
 }


   function removeInfoDrinck() {
    this.classList.contains('btn3') ? flag = true: flag = false   
    const elem = start(flag);
    const {name, prod2,prod3,typeProd} = elem;
    let removeInfoDrinck = prompt(`Введите ${elem.prod} хотите удалить`,'');
      if (!removeInfoDrinck) {
         prompt(`
         Вы не ввели данные!!!
         Введите ${name} который хотите удалить`,''); 
      }
            
      res = typeProd.deleteValue(removeInfoDrinck);
       
      if (res) {
         alert( `${prod2} успешно`); 
      } else {
         alert(`Такого ${prod3}  в базе данных нет`)
      }
   }
 
 function getDrinckInfoAll() {
   this.classList.contains('btn4') ? flag = true: flag = false   
   const elem = start(flag);
   const {prod4, typeProd} = elem;
   drinckAll = typeProd.getKeys();
       
    if (drinckAll.length !== 0) {
      drinckAll = drinckAll.join(',');
      alert(drinckAll)
    } else {
      alert(`
      В базе данных ${prod4} нет!
     Вы не внесли ничего`); 
    }
  }
}())