import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class StorageControllerService {
  // Storage Variables
  tripData: any;
  allTripsData: any = {};
  keys: any;

  constructor(private storage: Storage) { }
  // Storage Functions
  setStorageData(key: string, value: any){
    this.storage.set(key, value)
  }
  getStorageData(key: string){
    this.storage.get(key).then((val) => {
      this.tripData = val;
    }).catch((error) => {
      console.log('Error ' + key + '', error);
    });
  }
  getStorageKeys(){
    this.storage.keys().then((keys) => {
      this.keys = keys;
    });
  }
  getAllTripsData(){
    this.storage.forEach((value: any, key: string) => {
      this.allTripsData[`${key}`] = value;
    });
    return this.allTripsData;
  }
  clearAllTripsData(){
    this.storage.forEach((value: any, key: string) => {
      this.storage.remove(key);
    });
  }
  removeOneItem(key){
    this.storage.remove(key);
  }
  removeFromStorage(title){
    delete this.allTripsData[title];
  }

}
