"use strict";
function HashStorageFunc() {
   const self = this;
   let storage = {};

  
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
     return Object.keys(storage);
     
   }

}


