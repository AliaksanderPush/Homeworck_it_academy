
let drinkStorage = new HashStorageFunc();
 
 document.querySelector('.btn1').addEventListener('click', drinckInfo);
 document.querySelector('.btn2').addEventListener('click', getDrinckInfo);
 document.querySelector('.btn3').addEventListener('click', removeInfoDrinck);
 document.querySelector('.btn4').addEventListener('click', getDrinckInfoAll); 

 function drinckInfo() {
    let drinck = prompt('Введите напиток, который Вы предпочитаете','');
    while (!drinck) {
      drinck = prompt(`
      Вы не ввели данные!!!! 
      Введите напиток, который Вы предпочитаете`,''); 
    }
    let alc = confirm('Он алкогольный или нет?','');
    let rec = prompt('Напишите рецепт его приготовления','');
    while (!rec) {
       rec = prompt(`
        Вы не написали рецепт!!!
        Напишите рецепт его приготовления`,'');
    }
   
       drinkStorage.addValue(drinck, {alcoholic:alc, recept:rec});
       alert('Данные внесены успешно!');
       drinkStorage.cookingRecipe();
    
 }

 function getDrinckInfo() {
    let getInfo = prompt('Введите напиток рецепт которого хотите узнать',''); 
    if (!getInfo) {
      getInfo = prompt(`
       Вы не ввели данные!!!
       Введите напиток рецепт которого хотите узнать`,''); 
    }

    let getInfoDrinck = drinkStorage.getValue(getInfo);
    
    
   if (getInfoDrinck) {
      const {alcoholic, recept} = getInfoDrinck;
      alert(`
             напиток: ${getInfo}
             алкогольный: ${alcoholic ? 'да':'нет'}
             рецепт приготовления: ${recept}`
           );
   } else {
      alert('Информации о таком напитке нет(((');
   }
 }

   function removeInfoDrinck() {
    let removeInfoDrinck = prompt('Введите напиток который хотите удалить','');
      if (!removeInfoDrinck) {
         prompt(`
         Вы не ввели данные!!!
         Введите напиток который хотите удалить`,''); 
      }
      if (drinkStorage.deleteValue(removeInfoDrinck)) {
         alert('Напиток удален успешно'); 
      } else {
         alert('Такого напитка в базе данных нет')
      }
   }
 
 function getDrinckInfoAll() {
   let drinckAll = drinkStorage.getKeys();
    if (drinckAll) {
      drinckAll = drinckAll.join(',');
      alert(drinckAll)
    } else {
      alert(`
      В базе данных напитков нет!
     Вы не внесли ни один напиток`); 
    }
    
 }
 