import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageControllerService } from '../services/storage-controller.service'
import { InfoModalPage } from '../modals/info-modal/info-modal.page'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // Variables 
  currentTripData: any;
  todaysDate = Date.now();
  // Constructor
  constructor(private storage: StorageControllerService, public modalController: ModalController) {}
  // On init
  ngOnInit(){
    this.loadFutureTrip();
  }
  // Load Future Trips function
  async loadFutureTrip(){
    this.storage.getAllTripsData();
    this.currentTripData = this.storage.allTripsData;
    this.todaysDate;
  }
  // Get more info modal
  async infoModal(tripkey) {
    const modal = await this.modalController.create({
      component: InfoModalPage,
      componentProps: {
        "modalData": this.currentTripData[tripkey],
        "paramTitle": tripkey
      }
    });
    return await modal.present();
  }
  // Pull to refresh function
  doRefresh(event) {
    this.loadFutureTrip();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
