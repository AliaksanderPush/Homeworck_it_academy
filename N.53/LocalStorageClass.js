"use strict";
class LocalStorageClass  {
  constructor() {
    this.storage = {};
  
  }

  getstore(lsKeyName) {
  //  if (localStorage.getItem(lsKeyName)) {
       const prod= window.localStorage.getItem(lsKeyName);
       const obj = JSON.parse(prod);
        for (let item in obj) {
          this.storage[item] = obj[item]; 
        }
   // }
    
  }
 
  setStore(lsKeyName) {
     localStorage.setItem(lsKeyName, JSON.stringify(this.storage));
  }
    
  addValue(key, value ) {
      this.storage[key] = value;
  }  

  getValue(lsKeyName, key) {
    this.getstore(lsKeyName);
    return this.storage[key];
  }


  deleteValue(lsKeyName, key) {
    this.getstore(lsKeyName);
   if ((key in this.storage)) {
       delete this.storage[key];
       this.setStore(lsKeyName);
       return true;
    } else {
       return false;
    }
  }

  getKeys(lsKeyName) {
    this.getstore(lsKeyName);
    return Object.keys(this.storage);
  }

}
