const drinkStorage = new LocalStorageClass();
const dishStorage = new LocalStorageClass();

 
 document.querySelector('.btn1').addEventListener('click', drinckInfo);
 document.querySelector('.btn5').addEventListener('click', drinckInfo);

 document.querySelector('.btn2').addEventListener('click', getDrinckInfo);
 document.querySelector('.btn6').addEventListener('click', getDrinckInfo);

 document.querySelector('.btn3').addEventListener('click', removeInfoDrinck);
 document.querySelector('.btn7').addEventListener('click', removeInfoDrinck);

 document.querySelector('.btn4').addEventListener('click', getDrinckInfoAll); 
 document.querySelector('.btn8').addEventListener('click', getDrinckInfoAll); 

 let objDrink = {
   prod : 'напиток, который',
   type : 'Он алкогольный',
   name: 'напиток',
   name2:'напитке',
   prod2: 'Напиток удален',
   prod3: 'напитка',
   prod4 :'напитков'
}

let objDish = {
   prod : 'блюдо, которое',
   type : 'Оно вегетарианское',
   name: 'блюдо',
   name2: 'блюде',
   prod2: 'Блюдо удалено',
   prod3: 'блюда',
   prod4: 'блюд'
}




 function drinckInfo() {
  let elem = null;
  let typeProd = false;
   if (this.classList.contains('btn1')) {
      elem = objDrink;
      typeProd = true;
   }  else {
      elem = objDish; 
   }
  
     let  drinck = prompt(`Введите ${elem.prod} Вы предпочитаете`,'');
    while (!drinck) {
      drinck = prompt(`
      Вы не ввели данные!!!! 
      Введите ${elem.prod} Вы предпочитаете`,''); 
    }
    let alc = confirm(`${elem.type} или нет?`,'');
    let rec = prompt(`Напишите  рецепт его приготовления`,'');
      while (!rec) {
         rec = prompt(`
         Вы не написали рецепт!!!
         Напишите рецепт его приготовления`,'');
      }
      if (typeProd) {
       drinkStorage.addValue(drinck, {alcoholic:alc, recept:rec},"lsDrink");
       drinkStorage.addStore("lsDrink");
       } else {
       dishStorage.addValue(drinck, {alcoholic:alc, recept:rec},"lsDish");   
       dishStorage.addStore("lsDish");
       }
        
       alert('Данные внесены успешно!');
 }   
 

 function getDrinckInfo() {
   let elem = null;
   let typeProd = false;
   let getInfoDrinck = null;
   if (this.classList.contains('btn2')) {
      elem = objDrink;
      typeProd = true;
   }  else {
      elem = objDish; 
   }

    let getInfo = prompt(`Введите ${elem.name} рецепт которого хотите узнать`,''); 
    if (!getInfo) {
      getInfo = prompt(`
       Вы не ввели данные!!!
       Введите ${elem.name} рецепт которого хотите узнать`,''); 
    }
    
    if (typeProd) {
      getInfoDrinck = drinkStorage.getValue("lsDrink", getInfo);
    } else {
      getInfoDrinck = dishStorage.getValue("lsDish", getInfo);
    }
 
   if (getInfoDrinck) {
      const {alcoholic, recept} = getInfoDrinck;
      alert(`
             ${elem.name}: ${getInfo}
             алкогольный: ${alcoholic ? 'да':'нет'}
             рецепт приготовления: ${recept}`
           );
   } else {
      alert(`Информации о таком ${elem.name2}  нет(((`);
   }
 }


   function removeInfoDrinck() {
      let elem = null;
      let typeProd = false;
      let key = '';
      let res = false;
       if (this.classList.contains('btn3')) {
          elem = objDrink;
          typeProd = true;
       }  else {
          elem = objDish; 
       }
 
    let removeInfoDrinck = prompt(`Введите ${elem.prod} хотите удалить`,'');
      if (!removeInfoDrinck) {
         prompt(`
         Вы не ввели данные!!!
         Введите ${elem.name} который хотите удалить`,''); 
      }
      
      if (typeProd) {
        key = "lsDrink"; 
        res = drinkStorage.deleteValue(key, removeInfoDrinck);
      } else {
        key = "lsDish";
        res = dishStorage.deleteValue(key, removeInfoDrinck);
      }
   
      if (res) {
         alert( `${elem.prod2} успешно`); 
      } else {
         alert(`Такого ${elem.prod3}  в базе данных нет`)
      }
   }
 
 function getDrinckInfoAll() {
  let elem = null;
  let typeProd = false;
  let key = '';
  let drinckAll = [];
   if (this.classList.contains('btn4')) {
      elem = objDrink;
      typeProd = true;
   }  else {
      elem = objDish; 
   }
    if (typeProd) {
       key = "lsDrink" 
       drinckAll = drinkStorage.getKeys(key);
    } else {
       key = "lsDish"
       drinckAll = dishStorage.getKeys(key);
    }
      
    if (drinckAll.length !== 0) {
      drinckAll = drinckAll.join(',');
      alert(drinckAll)
    } else {
      alert(`
      В базе данных ${elem.prod4} нет!
     Вы не внесли ничего`); 
    }
    
 }
 