"use strict";
function HashStorageFunc() {
   const self = this;
   let drink = {
    name: '',
    alcohol: false

   }

   
   self.cookingRecipe = function() {
      console.log(drink);
   }

   self.addValue = function(key, value) {
     drink = {...drink,
       [key]: value 
     }

   self.getValue = function(key) {
      return drink[key];
   }
   self.deleteValue = function(key) {
        return  delete drink[key];
   }

   self.getKeys = function() {
      return Object.keys(drink);
   }
     
   }
}
let n = new HashStorageFunc();
n.addValue('name','beer' );
n.cookingRecipe();
n.addValue('name','huh' );
n.addValue('re','tyu' );
n.addValue('swer','ger' );
n.cookingRecipe();
console.log(n.getValue('name'));
console.log(n.deleteValue('name'));
n.cookingRecipe();
console.log(n.getKeys());