"use strict";
function HashStorageFunc() {
   const self = this;
   let storage = {};

   
   self.cookingRecipe = function() {
      console.log(storage);
   }

   self.addValue = function(key, value) {
       storage[key] = value ;
   }  

   self.getValue = function(key) {
      return storage[key];
   }
   self.deleteValue = function(key) {
        if ((key in storage)) {
            delete storage[key];
            return true;
        } else {
            return false;
        }
   }

   self.getKeys = function() {
      if (Object.keys(storage).length !== 0) {
        return Object.keys(storage);
      }  else {
        return false;    
      }
     
   }

}
