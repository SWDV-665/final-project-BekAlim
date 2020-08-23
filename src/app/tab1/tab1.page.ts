import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageControllerService } from '../services/storage-controller.service'
import { AddModalPage } from '../modals/add-modal/add-modal.page'
import { EditModalPage } from '../modals/edit-modal/edit-modal.page'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // Variables
  currentTripData: any;
  todaysDate = Date.now();
  dataReturned: any;
  // Constructor
  constructor(private storage: StorageControllerService, public modalController: ModalController, public alertController: AlertController) {}
  // On init
  ngOnInit(){
    this.loadCurretTrip();
  }
  // Load Current Trips function
  async loadCurretTrip(){
    this.storage.getAllTripsData();
    this.currentTripData = this.storage.allTripsData;
    this.todaysDate;
  }
  // Open Modal function for Adding a trip
  async openModal() {
    const modal = await this.modalController.create({component: AddModalPage});
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned;
        if(this.currentTripData[this.dataReturned.data[0]]){
          this.raiseAlert(this.dataReturned.data[0]);
        }else{
          this.storage.setStorageData(this.dataReturned.data[0], this.dataReturned.data[1]);
        }
      }
    });
    return await modal.present();
  }
  // Edit Modal function
  async editModal(tripkey) {
    const modal = await this.modalController.create({
      component: EditModalPage,
      componentProps: {
        "modalData": this.currentTripData[tripkey],
        "paramTitle": tripkey
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned;
        this.storage.setStorageData(this.dataReturned.data[0], this.dataReturned.data[1]);
      }
    });

    return await modal.present();
  }
  // Raise Alert Function
  async raiseAlert(title) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Title warning',
      message: `The title: '${title}' already exists, please choose another title.`,
      buttons: ['OK']
    });
    await alert.present();
  }
  // Pull to Refresher
  doRefresh(event) {
    setTimeout(() => {
      this.loadCurretTrip();
      event.target.complete();
    }, 2000);
  }
}
