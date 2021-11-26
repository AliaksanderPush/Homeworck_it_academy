"use strict";
class LocalStorageClass  {
  constructor(lsKeyName) {
    this.storage = {};
    this.lsKeyName = lsKeyName;
  }

  getstore() {
       const prod= window.localStorage.getItem(this.lsKeyName);
       const obj = JSON.parse(prod);
        for (let item in obj) {
          this.storage[item] = obj[item]; 
        }
     
  }
 
  setStore() {
     localStorage.setItem(this.lsKeyName, JSON.stringify(this.storage));
  }
    
  addValue(key, value ) {
      this.storage[key] = value;
  }  

  getValue(key) {
    this.getstore();
    return this.storage[key];
  }


  deleteValue(key) {
    this.getstore();
   if ((key in this.storage)) {
       delete this.storage[key];
       this.setStore();
       return true;
    } else {
       return false;
    }
  }

  getKeys() {
    this.getstore();
    return Object.keys(this.storage);
  }

}
