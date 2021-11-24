"use strict";
class LocalStorageClass  {
  constructor(lsKeyName) {
    this.storage = {};
    
   
      if (lsKeyName == "lsDish") {
       let  myObject = JSON.parse(localStorage.lsDish);
        this.storage = myObject;
      }
      if (lsKeyName == "lsDrink") {
        let  myObject = JSON.parse(localStorage.lsDrink);
        this.storage = myObject;
      }
  
   
  }
   addStore(lsKeyName) {
    localStorage.setItem(lsKeyName, JSON.stringify(this.storage));
   }
     
   addValue(key, value) {
     this.storage[key] = value ;
     console.log(this.storage);
     
   }  

   getValue(key , value) {
     return this.storage[key][value];
   }

   deleteValue(key, value) {
     if ((key in this.storage)) {
       for (let elem in this.storage) {
        for (let item in this.storage[elem]) {
          if (item === value) {
            delete this.storage[key]; 
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
       return false;
    }
   }

    getKeys() {
      return Object.keys(this.storage);
     
   }

}
