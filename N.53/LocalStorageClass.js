"use strict";
class LocalStorageClass  {
  constructor() {
    this.drinkStorage = {};
    this.dishStorage = {};
       
  }
  getProduct(lsKeyName) {
    const prod = window.localStorage.getItem(lsKeyName);
    return JSON.parse(prod);
  }

  setProduct(lsKeyName, storage) {
    localStorage.setItem(lsKeyName, JSON.stringify(storage));
  }

  addStore(lsKeyName) {
    if (lsKeyName === "lsDish") {
      this.setProduct(lsKeyName, this.dishStorage);
    } else {
      this.setProduct(lsKeyName, this.drinkStorage);
    }
    
  }
    
  addValue(key, value, lsKeyName) {
    if (lsKeyName === "lsDish") {
      this.dishStorage[key] = value;
    } else {
      this.drinkStorage[key] = value;
    } 
  }  

  getValue(lsKeyName, key) {
    const product = this.getProduct(lsKeyName);
    for (let item in product) {
      if (item === key) {
        return product[item];
      } else {
        return false;
      }
    }
  }


  deleteValue(lsKeyName, key) {
    const product = this.getProduct(lsKeyName);
    if ((key in product)) {
      delete product[key];
      this.setProduct(lsKeyName, product);
      lsKeyName === "lsDish" ? delete this.dishStorage[key]:delete this.drinkStorage[key]
      return true;
    } else {
        return false;
    }
  }

  getKeys(lsKeyName) {
    const prod = this.getProduct(lsKeyName);
    return Object.keys(prod);
  }

}
